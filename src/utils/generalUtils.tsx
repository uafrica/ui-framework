import { v4 as uuidv4 } from "uuid";

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

export { capitalize, getError, getErrorString, getUUIDFilename, isImage, isCsv, isKML, isPdf, reverseArray };
