function formatNumberWithCurrency(
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

function formatWeight(weight: any) {
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

function formatNumber(amount: any, formatAsInteger: boolean, addSpaces: boolean) {
  if (amount === null || typeof amount === "undefined") return "";

  amount = amount.toString().replace(/\s/g, "");
  amount = Number(amount);

  if (formatAsInteger && Number.isInteger(amount)) {
    // @ts-ignore
    return addSpaces ? numberWithSpaces(amount + "") : amount + "";
  }

  if (isNaN(amount)) return "";

  amount = parseFloat(amount);

  return addSpaces ? numberWithSpaces(amount.toFixed(2)) : amount.toFixed(2);
}

function formatNumberWithPercentage(
  value: any,
  formatAsInteger: boolean,
  addSpaces: boolean,
  toFixedDigits?: number
) {
  if (value === null || typeof value === "undefined") return "";
  if (isNaN(value)) return "";

  let isNegative = value < 0;
  value = Math.abs(value);

  let valueOutput;
  if (formatAsInteger && Number.isInteger(value)) {
    valueOutput = addSpaces ? numberWithSpaces(value) : value + "";
  } else {
    value = parseFloat(value);
    valueOutput = addSpaces
      ? numberWithSpaces(value.toFixed(toFixedDigits ?? 1))
      : value.toFixed(toFixedDigits ?? 1);
  }

  return (isNegative ? "- " : "") + valueOutput + " " + "%";
}

function strToFloat(amount: string) {
  amount = amount.replaceAll(",", ".");
  return parseFloat(amount);
}

// HELPER FUNCTIONS
function numberWithSpaces(x: number) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

function roundAndFormatNumberWithSpaces(value: any, maxDecimals: number) {
  let d = Math.pow(10, maxDecimals);
  value = Math.round(value * d) / d;
  return numberWithSpaces(value);
}

// formats number to be displayed as eg. 12k instead of 12000
function abbreviatedNumber(num: number, digits: number) {
  let isNegative = false;
  if (num < 0) {
    isNegative = true;
  }
  num = Math.abs(num);
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });

  return item
    ? (isNegative ? "-" : "") + (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

function getPrimeNumbersBetween(min: number, max: number) {
  const result = Array(max + 1)
    .fill(0)
    .map((_, i) => i);
  for (let i = 2; i <= Math.sqrt(max + 1); i++) {
    for (let j = i ** 2; j < max + 1; j += i) delete result[j];
  }
  return Object.values(result.slice(Math.max(min, 2)));
}

function getRandomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomPrimeBetween(min: number, max: number) {
  const primes = getPrimeNumbersBetween(min, max);
  return primes[getRandomNumberBetween(0, primes.length - 1)];
}

export {
  formatNumberWithCurrency,
  formatWeight,
  formatNumber,
  roundAndFormatNumberWithSpaces,
  strToFloat,
  formatNumberWithPercentage,
  abbreviatedNumber,
  getPrimeNumbersBetween,
  getRandomNumberBetween,
  getRandomPrimeBetween
};
