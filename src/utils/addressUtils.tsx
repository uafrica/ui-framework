function addressObjFromGoogleResult(place: any): {
  company: any;
  address: any;
  street_address: any;
  local_area: any;
  city: any;
  zone: any;
  country: any;
  code: any;
  lat_lng: any;
  lat: any;
  lng: any;
} {
  // Copied from google API developer guide
  const googleComponentForm: any = {
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
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng()
  };

  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    // get the long/short version of the place address component base on componentForm
    if (googleComponentForm[addressType]) {
      googleAddressObj[addressType] = place.address_components[i][googleComponentForm[addressType]];
    }
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

  let city: any;

  if (googleAddressObj.locality) {
    city = googleAddressObj.locality;
  }

  if (!city) {
    city = googleAddressObj.administrative_area_level_2;
  }

  const addressObj = {
    company,
    address: streetAddress,
    street_address: streetAddress,
    local_area: localArea.join(", "),
    city,
    code: googleAddressObj.postal_code,
    zone: googleAddressObj.administrative_area_level_1,
    country: googleAddressObj.country,
    lat_lng: googleAddressObj.lat_lng,
    lat: googleAddressObj.lat_lng.lat,
    lng: googleAddressObj.lat_lng.lng,
    entered_address: ""
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
  let { company, address, local_area, city, code, zone, country } = addressObj;

  return concatNonEmpty([company, address, local_area, city, code, zone, country], ", ");
}

export {
  addressObjFromGoogleResult,
  formatEnteredAddress,
  formatEnteredAddressLine,
  generateEnteredAddress
};
