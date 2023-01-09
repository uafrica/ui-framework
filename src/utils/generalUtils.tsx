import { v4 as uuidv4 } from "uuid";
import { Message } from "../Message";
import { ReactElement } from "react";

// Used to check current app version

function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getUUIDFilename(url: string) {
  let lastDotIndex = url.lastIndexOf(".");
  let lastQuestionIndex = url.lastIndexOf("?");
  let extension;

  if (lastDotIndex >= 0) {
    if (lastQuestionIndex >= 0) {
      extension = url.substring(lastDotIndex, lastQuestionIndex);
    } else {
      extension = url.substring(lastDotIndex);
    }
  }
  if (!extension) {
    extension = ".png";
  }

  return uuidv4() + extension;
}

function isCsv(file: any): RegExpExecArray | null | false {
  if (!file) return false;

  let validationRegex = /(\.csv)$/i;
  return validationRegex.exec(file.name.toLowerCase());
}

function isImage(file: any): RegExpExecArray | null | false {
  if (!file) {
    return false;
  }

  var validationRegex = /(\.jpg|\.jpeg|\.png)$/i;
  return validationRegex.exec(file.name.toLowerCase());
}

function isKML(file: any): RegExpExecArray | null | false {
  if (!file) return false;

  var validationRegex = /(\.kml)$/i;
  return validationRegex.exec(file.name.toLowerCase());
}

function isPdf(file: any): RegExpExecArray | null | false {
  if (!file) return false;

  var validationRegex = /(\.pdf)$/i;
  return validationRegex.exec(file.name.toLowerCase());
}

function reverseArray(arr: any[]): any[] {
  var newArray = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    newArray.push(arr[i]);
  }
  return newArray;
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

function checkTokenExpired(_store: any, response: any) {
  if (response.status === 403 || response.status === 401) {
    console.log("Received 403 or 401, checking for expired token");
    console.log("AWS error", response.headers.get("x-amzn-errortype"));
    if (response.headers.get("x-amzn-errortype") === "ExpiredTokenException") {
      localStorage.removeItem("impersonated_username");
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

function checkMaintenanceMode(store: any, response: any) {
  if (response.status === 418) {
    // I'm a teapot response from the lambda
    store.emitter.emit("maintenanceMode");
  }
}

async function stopImpersonation() {
  if (localStorage.impersonated_username) {
    alert(`Could not impersonate ${localStorage.impersonated_username}.`);
    localStorage.removeItem("impersonated_username");
    localStorage.removeItem("impersonated_user");
    window.location.href = "/accounts";
  }
}

function getErrorString(result: any): string {
  if (!result) {
    return "";
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
      var json = JSON.parse(result.error.message);
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

function getError(result: any, hideConsoleLog?: boolean | null): string {
  var error: any = getErrorString(result);

  if (error) {
    if (typeof error === "object") {
      error = error?.error;
    }

    if (error === "The user aborted a request.") {
      return "";
    }

    if (!hideConsoleLog) {
      console.log("Error", error, result.stack);
    }

    if (error?.toLowerCase() === "service unavailable") {
      return "Service unavailable. Please check your Internet connection.";
    }

    if (typeof error === "string") {
      error = error.replaceAll("Username/client id combination", "Email"); // AWS terminology
      error = error.replaceAll(
        "Failed to fetch",
        "There is a problem with your internet connectivity"
      );
    } else {
      error = JSON.stringify(error);
    }
  }

  if (error.trim() === "the account has been closed") return ""; // handled by the 423 code

  return capitalize(error);
}

function showError(error: Error | string | undefined): ReactElement | null {
  var errorMessage = getError(error, true);

  if (!errorMessage) {
    return null;
  }

  return <Message.Error>{errorMessage}</Message.Error>;
}

function shorten(str: string | null | undefined, count: number): string {
  if (!str) {
    return "";
  }

  if (str.length < count) {
    return str;
  }

  return str.substr(0, count - 3) + "...";
}

function humanReadableToKey(string: string): string {
  if (!string) {
    return "";
  }
  var key = string.replaceAll(" ", "_").toLowerCase();

  return key;
}

function keyToHumanReadable(key: string | undefined): string {
  if (!key) return "";

  let keyHumanReadable = key.replaceAll("_", " ");
  keyHumanReadable = keyHumanReadable.replaceAll("sender", "collection");
  keyHumanReadable = keyHumanReadable.replaceAll("receiver", "delivery");
  keyHumanReadable = keyHumanReadable.replaceAll("-", " ");

  // camelcase to sentence case
  keyHumanReadable = keyHumanReadable.replace(/([A-Z])/g, " $1").trim();

  return keyHumanReadable.charAt(0).toUpperCase() + keyHumanReadable.slice(1).toLowerCase();
}

function cleanURL(url: string): string {
  if (!url) return "";

  let cleanURL = url.replace("http://", "https://").trim();
  if (!cleanURL.startsWith("https://")) {
    cleanURL = "https://" + cleanURL;
  }
  return cleanURL;
}

function cleanPhone(phone: string, removeSpaces?: boolean): string {
  if (!phone) return "";

  const countryCode = "27";

  var cleanPhone = phone.replaceAll(" ", "");
  // convert e.g. 0027 to +27
  if (cleanPhone.indexOf("00" + countryCode) === 0) {
    cleanPhone = "+27" + cleanPhone.substr(4);
  }

  // convert e.g. 076 to +2776
  if (cleanPhone.indexOf("0") === 0) {
    cleanPhone = "+27" + cleanPhone.substr(1);
  }

  if (cleanPhone.length === 12) {
    cleanPhone =
      cleanPhone.substr(0, 3) +
      " " +
      cleanPhone.substr(3, 2) +
      " " +
      cleanPhone.substr(5, 3) +
      " " +
      cleanPhone.substr(8, 4);
  }

  if (removeSpaces) {
    cleanPhone = cleanPhone.replaceAll(" ", "");
  }

  return cleanPhone;
}

function defaultString(str: string): string {
  if (!str) return "";
  return str;
}

function padLeadingZeros(num: number, size: number): string {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function clone(obj: any): any {
  if (!obj) return;
  return JSON.parse(JSON.stringify(obj));
}

export {
  capitalize,
  getError,
  getErrorString,
  showError,
  getUUIDFilename,
  isImage,
  isCsv,
  isKML,
  isPdf,
  reverseArray,
  serialize,
  stopImpersonation,
  checkTokenExpired,
  checkAccountClosed,
  checkMaintenanceMode,
  shorten,
  humanReadableToKey,
  keyToHumanReadable,
  cleanURL,
  cleanPhone,
  defaultString,
  padLeadingZeros,
  clone
};
