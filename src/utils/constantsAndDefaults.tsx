const defaultTablePageSize = 20;
const defaultTablePageSizeSmall = 10;
const defaultTablePageSizeLarge = 100;

function currency() {
  return "R";
}

function currencyLong() {
  return "ZAR";
}

const daysOfWeek = [
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
  { label: "Sunday", value: 0 }
];

const provinces = [
  { label: "Eastern Cape", value: "EC" },
  { label: "Free State", value: "FS" },
  { label: "Gauteng", value: "GP" },
  { label: "KwaZulu-Natal", value: "KZN" },
  { label: "Limpopo", value: "LP" },
  { label: "Mpumalanga", value: "MP" },
  { label: "Northern Cape", value: "NC" },
  { label: "North West", value: "NW" },
  { label: "Western Cape", value: "WC" }
];

const browserVersions = {
  chrome: "88.0.4324", // 2021-01-19
  crios: "88.0.4324", // 2021-01-19
  safari: "14.0.3", // 2021-02-01
  ios: "14.0.3", // 2021-02-01
  firefox: "91.0", // 2021-08-10
  fxios: "91.0", // 2021-08-10
  edge: "87.0.664.75", // 2021-01-07
  "edge-chromium": "87.0.664.75", // 2021-01-07
  "edge-ios": "87.0.664.75" // 2021-01-07
};

const googleAutocompleteOptions = {
  componentRestrictions: {
    country: []
  },
  fields: ["address_component", "geometry.location", "name", "type"]
};

const statusCode = [
  {
    label: "200s",
    value: "200"
  },
  {
    label: "300s",
    value: "300"
  },
  {
    label: "400s",
    value: "400"
  },
  {
    label: "500s",
    value: "500"
  }
];

const requestMethod = [
  {
    label: "GET",
    value: "GET"
  },
  {
    label: "POST",
    value: "POST"
  },
  {
    label: "PATCH",
    value: "PATCH"
  },
  {
    label: "PUT",
    value: "PUT"
  },
  {
    label: "DELETE",
    value: "DELETE"
  },
  {
    label: "SOAP",
    value: "SOAP"
  }
];

export {
  defaultTablePageSize,
  defaultTablePageSizeSmall,
  defaultTablePageSizeLarge,
  currency,
  currencyLong,
  daysOfWeek,
  provinces,
  browserVersions,
  googleAutocompleteOptions,
  statusCode,
  requestMethod
};
