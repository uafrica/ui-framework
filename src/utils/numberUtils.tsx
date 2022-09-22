export function formatNumberWithCurrency(
  amount: any,
  forceAsInteger: boolean,
  addSpaces: boolean,
  currency: string = "R"
) {
  if (amount === undefined) {
    return "";
  }
  if (isNaN(Number(amount))) {
    return amount.toString();
  }

  if (amount === 0) {
    return currency + " 0" + (forceAsInteger ? "" : ".00");
  }

  if (amount === null || typeof amount === "undefined") return "";
  if (isNaN(amount)) return "";

  let isNegative = amount < 0;
  amount = Math.abs(amount);

  let amountOutput;
  if (forceAsInteger) {
    amountOutput = addSpaces ? numberWithSpaces(Math.floor(amount)) : amount + "";
  } else {
    amount = parseFloat(amount);
    amountOutput = addSpaces ? numberWithSpaces(amount.toFixed(2)) : amount.toFixed(2);
  }

  return (isNegative ? "- " : "") + currency + " " + amountOutput;
}

export function formatWeight(weight: any) {
  if (weight === null || typeof weight === "undefined") return "";
  if (isNaN(weight) || weight === 0) return "–";

  let weightOutput;
  if (Number.isInteger(weight)) {
    weightOutput = numberWithSpaces(weight);
  } else {
    weight = parseFloat(weight);
    weightOutput = numberWithSpaces(weight.toFixed(2));
  }

  return weightOutput + "kg";
}

export function formatNumber(amount: any, formatAsInteger: boolean, addSpaces: boolean) {
  if (amount === null || typeof amount === "undefined") return "";

  if (formatAsInteger && Number.isInteger(amount)) {
    // @ts-ignore
    return addSpaces ? numberWithSpaces(amount + "") : amount + "";
  }

  if (isNaN(amount)) return "";

  amount = parseFloat(amount);

  return addSpaces ? numberWithSpaces(amount.toFixed(2)) : amount.toFixed(2);
}

export function strToFloat(amount: string) {
  amount = amount.replaceAll(",", ".");
  return parseFloat(amount);
}

// HELPER FUNCTIONS
function numberWithSpaces(x: number) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}
