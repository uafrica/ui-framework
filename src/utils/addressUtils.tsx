function addressObjFromGoogleResult(place: any): {
  company: any;
  street_address: any;
  local_area: any;
  city: any;
  zone: any;
  country: any;
  code: any;
  lat_lng: any;
  lat: any;
  lng: any;
  types: string[];
} {
  // Copied from google API developer guide
  const googleComponentShortOrLong: any = {
    street_number: "short_name",
    route: "long_name",
    sublocality_level_1: "long_name",
    sublocality_level_2: "long_name",
    locality: "long_name",
    administrative_area_level_2: "short_name",
    administrative_area_level_1: "long_name",
    country: "short_name",
    postal_code: "short_name"
  };

  var googleAddressObj: any = {};
  googleAddressObj.lat_lng = {
    lat:
      typeof place.geometry.location.lat === "function"
        ? place.geometry.location.lat()
        : place.geometry.location.lat,
    lng:
      typeof place.geometry.location.lng === "function"
        ? place.geometry.location.lng()
        : place.geometry.location.lng
  };

  for (var i = 0; i < place.address_components.length; i++) {
    place.address_components[i].types.forEach((addressType: any) => {
      // get the long/short version of the place address component base on componentForm
      if (googleComponentShortOrLong[addressType]) {
        googleAddressObj[addressType] =
          place.address_components[i][googleComponentShortOrLong[addressType]];
      }
    });
  }

  // Map to names expected by address form
  var streetAddress = googleAddressObj.street_number
    ? googleAddressObj.street_number + " " + googleAddressObj.route
    : googleAddressObj.route;
  var company = place.types.includes("establishment") ? place.name : "";

  let localArea = [];

  if (googleAddressObj.sublocality_level_1) {
    localArea.push(googleAddressObj.sublocality_level_1);
  }

  if (googleAddressObj.sublocality_level_2) {
    localArea.push(googleAddressObj.sublocality_level_2);
  }

  if (googleAddressObj.locality && localArea.length === 0) {
    localArea.push(googleAddressObj.locality);
  }

  let city = googleAddressObj.administrative_area_level_2;

  const addressObj = {
    company,
    street_address: streetAddress,
    local_area: localArea.join(", "),
    city,
    code: googleAddressObj.postal_code,
    zone: googleAddressObj.administrative_area_level_1,
    country: googleAddressObj.country,
    lat_lng: googleAddressObj.lat_lng,
    lat: googleAddressObj.lat_lng.lat,
    lng: googleAddressObj.lat_lng.lng,
    entered_address: "",
    types: place.types
  };

  addressObj.entered_address = generateEnteredAddress(addressObj);

  return addressObj;
}

function concatNonEmpty(strArray: any[], seperator: string): string {
  let array = strArray.filter((str: any) => Boolean(str));
  return array.join(seperator);
}

function formatEnteredAddressLine(
  address: string,
  lineNumber: number | undefined,
  bold: boolean
): any {
  if (!address) return "";
  if (typeof lineNumber === "undefined") {
    lineNumber = 1;
  }

  let arr = address.split(",");
  if (arr.length >= lineNumber) {
    if (bold) {
      return <b>{arr[lineNumber - 1]}</b>;
    }
    return arr[lineNumber - 1];
  }

  return "";
}

function formatEnteredAddress(address: string): any {
  if (!address) return "";
  return address.split(",").map((line, i) => {
    if (i === 0) {
      return (
        <div key={i}>
          <b>{line.trim()}</b>
        </div>
      );
    }
    return <div key={i}>{line.trim()}</div>;
  });
}

function generateEnteredAddress(addressObj: any): string {
  let { company, street_address, local_area, city, code, zone, country } = addressObj;

  return concatNonEmpty([company, street_address, local_area, city, code, zone, country], ", ");
}

function validateAddress(address: any) {
  // existing addresses will not be judged
  if (address.id && address.entered_address) {
    return "success";
  }

  let validationItems = [];
  if (
    (address.street_address || address.company) &&
    address.local_area &&
    address.city &&
    address.zone &&
    address.country
  ) {
    return "success";
  } else {
    if (!(address.street_address || address.company)) {
      validationItems.push("street address or company");
    }
    if (!address.local_area) {
      validationItems.push("suburb");
    }
    if (!address.city) {
      validationItems.push("city");
    }
    if (!address.zone) {
      validationItems.push("province/zone");
    }
    if (!address.country) {
      validationItems.push("country");
    }
  }

  let validationString = validationItems.join(", ");

  return `requires the following: ${validationString}`;
}

function validateGoogleAddressType(addressObj: any, invalidTypes: string[]): boolean {
  // place types: https://developers.google.com/maps/documentation/places/web-service/supported_types#table1
  let isValid = true;
  if (addressObj.types) {
    invalidTypes.forEach((invalidType: string) => {
      if (addressObj.types.indexOf(invalidType) !== -1) {
        isValid = false;
      }
    });
  }
  return isValid;
}

function cleanProvince(province: string) {
  if (province) {
    province = province.replaceAll("KwaZulu-Natal", "KZN");
    province = province.replaceAll("KwaZulu Natal", "KZN");
    province = province.replaceAll("NL", "KZN");
    province = province.replaceAll("GT", "GP");
    province = province.replaceAll("Gauteng", "GP");
    province = province.replaceAll("Freestate", "FS");
    province = province.replaceAll("Free State", "FS");
    province = province.replaceAll("Limpopo", "LP");
    province = province.replaceAll("Mpumalanga", "MP");
    province = province.replaceAll("North West", "NW");
    province = province.replaceAll("Eastern Cape", "EC");
    province = province.replaceAll("Western Cape", "WC");
    province = province.replaceAll("Northern Cape", "NC");
    province = province.replaceAll("Eastern-Cape", "EC");
    province = province.replaceAll("Western-Cape", "WC");
    province = province.replaceAll("Northern-Cape", "NC");

    return province;
  }
  return;
}

function provinceAbbreviationToName(province: string) {
  if (province) {
    province = province.replaceAll("KZN", "KwaZulu-Natal");
    province = province.replaceAll("NL", "KwaZulu-Natal");
    province = province.replaceAll("GP", "Gauteng");
    province = province.replaceAll("GT", "Gauteng");
    province = province.replaceAll("FS", "Free State");
    province = province.replaceAll("LP", "Limpopo");
    province = province.replaceAll("MP", "Mpumalanga");
    province = province.replaceAll("NW", "North West");
    province = province.replaceAll("EC", "Eastern Cape");
    province = province.replaceAll("WC", "Western Cape");
    province = province.replaceAll("NC", "Northern Cape");
    return province;
  }

  return;
}

export {
  addressObjFromGoogleResult,
  formatEnteredAddress,
  formatEnteredAddressLine,
  generateEnteredAddress,
  validateGoogleAddressType,
  validateAddress,
  cleanProvince,
  provinceAbbreviationToName
};
