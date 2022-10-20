import { Auth } from "@aws-amplify/auth";
import aws4 from "aws4";

function checkMaintenanceMode(store: any, response: any) {
  if (response.status === 418) {
    store.emitter.emit("maintenanceMode");
  }
}

function checkTokenExpired(_store: any, response: any) {
  if (response.status === 403 || response.status === 401) {
    console.log("Received 403 or 401, checking for expired token");
    console.log("AWS error", response.headers.get("x-amzn-errortype"));
    if (response.headers.get("x-amzn-errortype") === "ExpiredTokenException") {
      console.log("Token expired");
    }
  }
}

function checkAccountClosed(store: any, response: any) {
  if (response.status === 423) {
    console.log("Account closed, redirecting");
    store.emitter.emit("accountClosed");
  }
}

let activeRequests: any = {};
let requestIdCounter = 0;

// Ensure that the response from the latest request is used:
// If two identical requests are made in the order A then B, and A returns slower than B does, A will be killed and the results from B will be used.
// If a returns before B, the results from A will be used until B returns a result

async function killDuplicateRequests(activeRequest: {
  body: any;
  method: string;
  requestId: number;
  url: string;
  requestTimeStamp: Date;
}) {
  let requestIds = Object.keys(activeRequests[activeRequest.url]);

  for (const requestId of requestIds) {
    let req = activeRequests[activeRequest.url][requestId];
    if (req.requestId === activeRequest.requestId) {
      // remove request from active requests
      delete activeRequests[activeRequest.url][requestId];
    } else if (
      activeRequest.url === req.url &&
      activeRequest.method === req.method &&
      JSON.stringify(activeRequest.body) === JSON.stringify(req.body)
    ) {
      // // kill all other requests with the same parameters & remove from active requests
      if (activeRequest.requestTimeStamp < req.requestTimeStamp) {
        // abort only if request was made before the active request and has not yet returned a response
        await req.abortController.abort();
        console.warn("Aborted duplicate request", `${req.method}: ${req.url}`);
        delete activeRequests[activeRequest.url][requestId];
      }
    }
    if (Object.keys(activeRequests[activeRequest.url]).length === 0) {
      delete activeRequests[activeRequest.url];
    }
  }
}

// Signed request call an API Gateway endpoint and signs the request signature version 4 with the given credentials
// store - the state store
// endpoint - the stage and name of the endpoint e.g. /Prod/shipments
// method - the http method GET, POST etc.s
// args - the query arguments (for GET) or the body arguments of the request
// headers - the http headers for the request e.g. {"Content-Type":"application/x-www-form-urlencoded"}
async function signedRequest(
  store: any,
  endpoint: string,
  method: string,
  args?: any,
  headers?: any,
  disallowDuplicateCancel?: boolean,
  retryCounter?: number
): Promise<any> {
  const maxRetries = 3;
  const _retryCounter: number = retryCounter ?? 0;
  if (!args) {
    args = {};
  }

  if (!headers) {
    headers = { "Content-Type": "application/json" };
  }

  // headers["client-version"] = "web-" + packageJson.version;

  method = method.toUpperCase();

  try {
    let body = null;
    let path = endpoint;

    // Build query arguments from args for get
    if (method === "GET") {
      if (store && store.impersonated_user_id) {
        args.request_id = store.impersonated_user_id;
      }

      path += serialize(args);
      // Else use the args for the request body
    } else {
      body = JSON.stringify(args);

      if (store && store.impersonated_user_id) {
        path += serialize({
          request_id: store.impersonated_user_id
        });
      }
    }

    let url = `https://${store.config.api}${path}`;
    if (store.config.api.indexOf("localhost") >= 0) {
      url = `http://${store.config.api}${path}`;
    }

    // Options for the signature version 4 signing
    const opts: any = {
      method: method,
      path: path,
      headers: headers,
      hostname: store.config.api,
      url: url,
      region: store.config.region,
      service: "execute-api"
    };

    if (body !== null) {
      opts.body = body;
    }

    const credentials = await Auth.currentCredentials();
    // AWS credentials
    const { accessKeyId, secretAccessKey, sessionToken } = credentials;

    // create the signed request
    const _signedRequest: any = aws4.sign(opts, {
      accessKeyId,
      secretAccessKey,
      sessionToken
    });

    let request: any;

    let init: { method: string; headers: any; body: any; signal?: any } = {
      method: method,
      headers: _signedRequest.headers,
      body: body
    };

    if (method === "GET" && !disallowDuplicateCancel) {
      let requestId = requestIdCounter;
      requestIdCounter++;
      let abortController = new AbortController();
      request = {
        url: _signedRequest.url,
        method,
        abortController,
        body,
        requestId,
        requestTimeStamp: new Date()
      };
      if (!activeRequests[url]) {
        activeRequests[url] = {};
      }
      activeRequests[url][requestId] = request;
      init.signal = abortController.signal;
    }

    let response: any;

    response = await fetch(_signedRequest.url, init);

    if (method === "GET" && !disallowDuplicateCancel) {
      killDuplicateRequests(request);
    }

    if (!response) {
      return { ok: false, status: 400, error: "No response found" };
    }

    if (!response.ok) {
      checkMaintenanceMode(store, response);
      checkTokenExpired(store, response);
      checkAccountClosed(store, response);

      // Error message is in response body as text
      let errorMsg = await response.text();

      if (errorMsg.toLowerCase().indexOf("service unavailable") > -1) {
        if (_retryCounter < maxRetries) {
          return new Promise(async resolve => {
            setTimeout(async () => {
              let res = await signedRequest(
                store,
                endpoint,
                method,
                args,
                headers,
                true,
                _retryCounter + 1
              );
              resolve(res);
            }, 1000 * (_retryCounter + 1)); // progressively longer timeouts as retries progress
          });
        } else {
          console.log("Service unavailable, maximum retries reached.");
        }
      }

      // Don't change this method without changing the backend
      if (errorMsg.indexOf("You're not logged in. Please log in and try again.") !== -1) {
        // redirect back to login page if not logged in
        window.location.href = "/login";
        return;
      }

      return { ok: false, error: new Error(errorMsg), code: response.status };
    }

    let data = "";
    try {
      data = await response.text();
      data = JSON.parse(data);
    } catch (e) {
      // assume it is text
    }

    return { ok: true, data, code: response.status };
  } catch (e) {
    return { ok: false, error: getError(e, true) };
  }
}

function serialize(obj: any): string {
  let str =
    "?" +
    Object.keys(obj)
      .reduce(function (a: string[], k: string) {
        let value = obj[k];
        if (Array.isArray(value)) {
          value = encodeURIComponent(JSON.stringify(value));
        } else {
          value = encodeURIComponent(value);
        }
        a.push(k + "=" + value);
        return a;
      }, [])
      .join("&");
  return str;
}

function getError(result: any, hideConsoleLog?: boolean | null): string {
  let error: any = getErrorString(result);

  if (error) {
    if (error === "The user aborted a request.") {
      return "";
    }
    if (!hideConsoleLog) {
      console.log("Error", error, result.stack);
    }

    if (typeof error === "string") {
      error = error.replaceAll("Username/client id combination", "Email"); // AWS terminology
      error = error.replaceAll(
        "Failed to fetch",
        "There is a problem with your internet connectivity"
      );
    } else if (error.error) {
      error = JSON.stringify(error);
    } else {
      error = "";
    }
  }

  return capitalize(error);
}

function getErrorString(result: any): string {
  if (!result) {
    return "";
  }

  if (result.code === 304 && Object.keys(result.error).length === 0) {
    return "Nothing changed";
  }

  if (result.response) {
    result = result.response;
    if (result.data) {
      result = result.data;
    }
  }

  try {
    result = JSON.parse(result);
  } catch (_) {
    // no json, but a string
  }

  if (typeof result === "object") {
    if (result.error && result.message) {
      return result.message;
    } else if (!result.error) {
      if (!result.message) {
        return result ? result : "";
      }
      return result.message;
    } else if (result.error && result.error.message) {
      try {
        result = JSON.parse(result.error.message);
        if (result.message) {
          return result.message;
        }
        return result;
      } catch (_) {
        // no json, but a string
      }

      return result.error.message;
    } else if (!result.error.message) {
      return result.error;
    }

    try {
      let json = JSON.parse(result.error.message);
      if (json.error) {
        return json.error;
      }
      return result.error.message;
    } catch (e) {
      return result.error.message;
    }
  } else {
    return result;
  }
}

function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { signedRequest };
