import { v4 as uuidv4 } from "uuid";
import { Message } from "../Message";
import { ReactElement } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { detect } from "detect-browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import * as dateUtils from "./dateUtils";
import moment from "moment";

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

  if (error && error?.trim() === "the account has been closed") return ""; // handled by the 423 code

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

  let sentenceCaseKey =
    keyHumanReadable.charAt(0).toUpperCase() + keyHumanReadable.slice(1).toLowerCase();

  sentenceCaseKey = sentenceCaseKey.replaceAll("Bob box", "Bob Box");
  sentenceCaseKey = sentenceCaseKey.replaceAll("Bob pay", "Bob Pay");
  sentenceCaseKey = sentenceCaseKey.replaceAll("Bob go", "Bob Go");

  return sentenceCaseKey;
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

function cleanUsername(username: string): string {
  // eslint-disable-next-line
  let onlyAscii = username.replace(/[^\x00-\x7F]/g, "");
  let nonWhitespace = onlyAscii.replace(/\s/g, "");
  return nonWhitespace.toLowerCase();
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

function swapValues(obj: any, prop1: string, prop2: string) {
  let originalProp1 = obj[prop1];
  obj[prop1] = obj[prop2];
  obj[prop2] = originalProp1;
}

function isScreenDesktopSize(): boolean {
  // check if screen size is less than 992px (smaller than 992 gets rearranged for mobile)
  return useMediaQuery("( min-width: 992px)");
}

function kebabCaseToSentenceCase(originalString: string) {
  let formattedString = originalString.replaceAll("-", " ");
  formattedString = capitalize(formattedString.toLowerCase());

  return formattedString;
}

const browserVersions = {
  chrome: "97.0.4692", // 2022-01-04
  crios: "97.0.4692", // 2022-01-04
  safari: "15.4", // 2022-03-14
  ios: "15.4", // 2022-03-14
  firefox: "96.0", // 2022-01-11
  fxios: "96.0", // 2022-01-11
  edge: "97.0.1072.55", // 2022-01-06
  "edge-chromium": "97.0.1072.55", // 2022-01-06
  "edge-ios": "97.0.1072.55" // 2022-01-06
};

function isBrowserOutdated(browserName: string, browserVersion: string) {
  let recentBrowserVersions: any = browserVersions;
  try {
    if (recentBrowserVersions[browserName]) {
      let recentVersion = Number(recentBrowserVersions[browserName].split(".")[0]);
      let _browserVersion = Number(browserVersion.split(".")[0]);
      if (recentVersion > _browserVersion) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (e) {
    console.log("isBrowserOutdated:", e);
    return false;
  }
}

async function getDataUrl(file: any): Promise<unknown> {
  return new Promise((resolve, reject) => {
    try {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function () {
        resolve(reader.result);
      };
    } catch (e) {
      reject(e);
    }
  });
}

function displayString(str: any) {
  if (str && str.length > 0) {
    return str;
  }
  return "–";
}

function isNotEmpty(value: any) {
  return value !== null && value !== undefined && value !== "";
}

function getBrowserIcon(browserName: string) {
  let icon: any = "window-maximize";
  switch (browserName.toLowerCase()) {
    case "chrome":
    case "crios":
      icon = "fa-brands fa-chrome";
      break;
    case "fxios":
    case "firefox":
      icon = "fa-brands fa-firefox-browser";
      break;
    case "edge":
    case "edge-ios":
    case "edge-chromium":
      icon = "fa-brands fa-edge";
      break;
    case "safari":
    case "ios":
      icon = "fa-brands fa-safari";
      break;
  }

  return icon;
}

function IsJsonString(str: any) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

function parseFieldsAsFloatsInsideObject(objData: any, arr: string[]) {
  // myData represents the array of values that will be matched to the arr fed to the function
  let myData: any = [];
  // Parse values in an object based on the array passed. The array should include the fields that you wanna parse
  Object.keys(objData)
    // get order of arrays correct
    .sort((a, b) => arr.indexOf(a) - arr.indexOf(b))
    .filter(el => callback(el, arr))
    .forEach(el => {
      let elData;
      if (IsJsonString(objData[el])) {
        elData = parseFloat(objData[el]);
      } else {
        elData = objData[el];
      }
      myData = myData.concat(elData);
    });

  function callback(el: any, arr: string[]) {
    return arr.indexOf(el) >= 0;
  }

  let retObj: any = arr.reduce((obj, arr, index) => ({ ...obj, [arr]: myData[index] }), {});

  return { ...objData, ...retObj };
}

function getFileExtension(filename: string): string | undefined {
  return filename.split(".").pop();
}

function openInNewTab(url: string, store: any) {
  let newWindow = window.open(url, "_blank");
  newWindow && newWindow.focus();

  if (!newWindow || newWindow.closed || typeof newWindow.closed == "undefined") {
    const browser = detect();
    let docs: string | null = null;

    switch (browser?.name) {
      case "chrome":
        docs =
          "https://support.google.com/chrome/answer/95472?hl=en&co=GENIE.Platform%3DDesktop#zippy=%2Callow-pop-ups-and-redirects-from-a-site";
        break;
      case "firefox":
        docs =
          "https://support.mozilla.org/en-US/kb/pop-blocker-settings-exceptions-troubleshooting#w_pop-up-blocker-settings";
        break;
      case "safari":
        docs = "https://support.apple.com/en-za/guide/safari/sfri40696/mac";

        break;
      default:
        docs = null;
    }

    store.emitter.emit("showAlert", {
      title: `Popups are blocked for ${window.location.origin}`,
      body: (
        <div>
          <div className="flex justify-center pb-6 pt-4 ">
            <div className="rounded-full bg-yellow-100 p-4">
              <FontAwesomeIcon icon="exclamation-triangle" size="2x" className="text-yellow" />
            </div>
          </div>
          <div className="pb-4">
            We tried to open{" "}
            <a href={url} target="_blank" className="text-primary cursor-pointer font-bold">
              {url}
            </a>{" "}
            in a new tab, but unfortunately popus are blocked by your browser.
          </div>
          <div>
            To unblock popups for this site, follow the{" "}
            {docs ? (
              <a href={docs} target="_blank" className="text-primary cursor-pointer font-bold">
                instructions
              </a>
            ) : (
              "instructions"
            )}{" "}
            on how to allow popups for your browser.
          </div>
        </div>
      ),
      showOkButton: true,
      showCancelButton: false,
      okButtonVariant: "primary",
      okButtonText: "Okay, thanks",
      return: async () => {}
    });
  }
}

function calculateSum(items: any[], field: string, decimals?: number) {
  if (!items) {
    return "–";
  }
  return items
    .filter(item => item !== undefined)
    .map(item => item[field])
    .reduce((a: any, b: any) => a + b)
    .toFixed(decimals === undefined ? 2 : decimals);
}

function differenceBetweenObjects(origObj: any, newObj: any) {
  function changes(newObj: any, origObj: any) {
    let arrayIndexCounter = 0;
    return _.transform(newObj, function (result, value, key) {
      if (!_.isEqual(value, origObj[key])) {
        let resultKey = _.isArray(origObj) ? arrayIndexCounter++ : key;

        // @ts-ignore
        result[resultKey] =
          _.isObject(value) && _.isObject(origObj[key]) ? changes(value, origObj[key]) : value;
      }
    });
  }

  return changes(newObj, origObj);
}

function mergeArrays(arr1: any[], arr2: any[], val: string) {
  return arr1 && arr1.map(obj => (arr2 && arr2.find(p => p[val] === obj[val])) || obj);
}

function getObjectByPropertyWithValue(array: any[], property: string, value: any): any {
  let obj = null;
  array.forEach((o: any) => {
    if (o[property] === value) {
      obj = o;
    }
  });
  return obj;
}

function omitPropsFromObj(obj: any, ...props: any) {
  const result = { ...obj };
  props.forEach(function (prop: any) {
    delete result[prop];
  });
  return result;
}

const duplicateObjectsInArray = (arr: any[], key: string) => {
  let newArrEl: any[] = [];
  arr.forEach((el: any) => {
    let array = Array(parseInt(el[key]))
      .fill(0)
      .map(() => {
        return Object.assign({}, el);
      });
    newArrEl = newArrEl.concat(array);
  });
  return newArrEl;
};

function addFiltersToArgsCheck(
  filters: any,
  args: any,
  wildCardedColumns?: string[],
  dontChangeDates?: boolean
) {
  if (!wildCardedColumns) wildCardedColumns = [];

  Object.keys(filters).forEach(key => {
    if (filters[key] && (!Array.isArray(filters[key]) || filters[key].length > 0)) {
      var val = filters[key];

      if (key === "start_date" || key === "date" || key === "from_invoice_date") {
        if (dontChangeDates) {
          val = dateUtils.pgFormatDate(moment(val));
        } else {
          val = dateUtils.pgFormatDate(moment(val).startOf("day"));
        }
      }

      if (key === "end_date" || key === "to_invoice_date") {
        if (dontChangeDates) {
          val = dateUtils.pgFormatDate(moment(val));
        } else {
          val = dateUtils.pgFormatDate(moment(val).endOf("day"));
        }
      }

      if (Array.isArray(filters[key])) {
        args[key] = JSON.stringify(val);
        // @ts-ignore
      } else if (wildCardedColumns.indexOf(key) === -1) {
        args[key] = val;
      } else {
        // Encode with % wildcard (postgres) at the begining and end of the argument
        // The encoding is need because args are put into the query URL
        args[key] = "%" + val + "%";
      }
    }
  });

  return args;
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
  clone,
  cleanUsername,
  swapValues,
  isScreenDesktopSize,
  kebabCaseToSentenceCase,
  isBrowserOutdated,
  getDataUrl,
  displayString,
  isNotEmpty,
  getBrowserIcon,
  getFileExtension,
  parseFieldsAsFloatsInsideObject,
  openInNewTab,
  calculateSum,
  differenceBetweenObjects,
  mergeArrays,
  getObjectByPropertyWithValue,
  omitPropsFromObj,
  duplicateObjectsInArray,
  addFiltersToArgsCheck
};
