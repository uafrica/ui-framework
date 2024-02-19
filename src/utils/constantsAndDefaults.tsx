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
  { label: "Sunday", value: 0 },
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
  { label: "Western Cape", value: "WC" },
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
  "edge-ios": "87.0.664.75", // 2021-01-07
};

const googleAutocompleteOptions = {
  componentRestrictions: {
    country: [],
  },
  fields: ["address_component", "geometry.location", "name", "type"],
};

const statusCode = [
  {
    label: "200s",
    value: "200",
  },
  {
    label: "300s",
    value: "300",
  },
  {
    label: "400s",
    value: "400",
  },
  {
    label: "500s",
    value: "500",
  },
];

const requestMethod = [
  {
    label: "GET",
    value: "GET",
  },
  {
    label: "POST",
    value: "POST",
  },
  {
    label: "PATCH",
    value: "PATCH",
  },
  {
    label: "PUT",
    value: "PUT",
  },
  {
    label: "DELETE",
    value: "DELETE",
  },
  {
    label: "SOAP",
    value: "SOAP",
  },
];

const defaultMapStyles = [
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [{ color: "#c8dccd" }],
  },
  {
    featureType: "landscape.natural.landcover",
    elementType: "geometry",
    stylers: [
      {
        color: "#fafafa",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#cccccc",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: "landscape.natural.terrain",
    elementType: "all",
    stylers: [
      {
        color: "#c8dccd",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#aee0f4",
      },
    ],
  },
];

const brandColours = {
  facebook: { primary: "#4267B2", 0: "#898F9C", 1: "#000000" },
  google: { primary: "#4285F4", 0: "#DB4437", 1: "#F4B400", 2: "#0F9D58" },
  instagram: {
    primary: "#833AB4",
    0: "#405DE6",
    1: "#5B51D8",
    2: "#C13584",
    3: "#E1306C",
    4: "#FD1D1D",
    5: "#F56040",
    6: "#777737",
    7: "#FCAF45",
    8: "#FFDC80",
  },
  twitter: {
    primary: "#1DA1F2",
    0: "#14171A",
    1: "#657786",
    2: "#AAB8C2",
    3: "#E1E8ED",
    4: "#F5F8FA",
  },
  whatsapp: {
    primary: "#25D366",
    0: "#128C7E",
    1: "#075E54",
    2: "#34B7F1",
  },
  youtube: {
    primary: "#FF0000",
    0: "#282828",
  },
  slack: {
    primary: "#611f69",
    0: "#89D3DF",
    1: "#ECB32D",
    2: "#E01A59",
    3: "#63C1A0",
  },
  microsoft: {
    primary: "#737373",
    0: "#F25022",
    1: "#7FBA00",
    2: "#00A4EF",
    3: "#FFB900",
  },
  android: {
    primary: "#78C257",
  },
  apple: {
    primary: "#000000",
    0: "#555555",
  },
};

export {
  defaultMapStyles,
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
  requestMethod,
  brandColours,
};
