import { isString, isNumber, filter } from "lodash";
import * as maplibre from "maplibre-gl";

function convertDMStoDD(
  degrees: number,
  minutes: number,
  seconds: number,
  direction: string
): number {
  let decimalDegrees = degrees + minutes / 60 + seconds / 3600;
  // If the direction is South or West, make the decimal degrees negative
  if (direction === "S" || direction === "W") {
    decimalDegrees *= -1;
  }
  return decimalDegrees;
}

function parseDMS(dmsString: string): number {
  const dmsRegex = /(\d+)°(\d+)'([\d.]+)"([NSEW])/;
  const match = dmsString.match(dmsRegex);
  if (!match) {
    throw new Error("Invalid DMS format");
  }

  const degrees = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const seconds = parseFloat(match[3]);
  const direction = match[4];

  return convertDMStoDD(degrees, minutes, seconds, direction);
}

function splitDMSString(dmsString: string): {
  latitude: number;
  longitude: number;
} {
  const [latString, lonString] = dmsString.split(" ");

  const latitude = parseDMS(latString);
  const longitude = parseDMS(lonString);

  return { latitude, longitude };
}

export const isValidCoordinates = (lat: string, lng: string) => {
  const ck_lat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  const ck_lng = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
  const validLat = ck_lat.test(lat);
  const validLon = ck_lng.test(lng);
  return validLat && validLon;
};

export const stringToLocation = (location = "") => {
  if (!isString(location)) return "";
  if (location) {
    location = location?.trim().replace(/\s+/g, ",");
    location = location.replace(",,", ",");
  }
  return location || "";
};

export const isLatLonText = (val = "") => {
  try {
    splitDMSString(val);
    return true;
  } catch (err) {}

  val = stringToLocation(val);
  let values = val.replace(/\s+/g, "").split(",");
  values = filter(values, (str) => !!str);
  if (values.length !== 2) return false;
  const [lat, log]: any = values;

  if (!isValidCoordinates(lat, log)) return false;
  const coords = [parseFloat(log), parseFloat(lat)];
  coords.sort();

  return true;
};

export const lngLatToString = (lngLat: Record<string, any>) => {
  return `${lngLat.lat.toFixed(7)},${lngLat.lng.toFixed(7)}`;
};

export const toFixedLatLong = (value: number, fixed: number) => {
  if (isNumber(value)) {
    return value.toFixed(fixed);
  }
  return value;
};

export const flyTo = (center: any, maps: any) => {
  const [lat, long] = center;
  center = [lat, long];
  maps.flyTo({ center: center, zoom: 9.99 });
};

let pingMarker: maplibre.Marker;
export const flyToMarker = (
  place: string & Record<string, number>,
  maps: any
) => {
  let lat = 0;
  let long = 0;

  try {
    ({ latitude: lat, longitude: long } = splitDMSString(place));
  } catch (err) {
    if (place?.lat && place?.lon) {
      lat = place.lat;
      long = place.long;
    } else {
      [lat, long] = place.split(",").map((val) => parseFloat(val));
    }
  }

  pingMarker && pingMarker.remove();
  try {
    pingMarker = new maplibre.Marker({ color: "#fc384a" })
      .setLngLat([long, lat])
      .addTo(maps);
    maps.flyTo({ center: pingMarker.getLngLat(), zoom: 19 });
  } catch (err) {
    console.error(err);
  }
  return pingMarker;
};
