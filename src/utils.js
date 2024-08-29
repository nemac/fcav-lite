import L from 'leaflet';

// Function to convert Web Mercator (EPSG:3857) to WGS84 (EPSG:4326)
export function webMercatorToLatLng(x, y) {
  const lng = (x / 20037508.34) * 180;
  let lat = (y / 20037508.34) * 180;
  lat = (180 / Math.PI) * (2 * Math.atan(Math.exp((lat * Math.PI) / 180)) - Math.PI / 2);
  return [lat, lng];
}

// Function to calculate center and zoom from extent
export function calculateCenterAndZoom(extent) {
  const [minX, minY, maxX, maxY] = extent.split(',').map(Number);

  const southWest = webMercatorToLatLng(minX, minY);
  const northEast = webMercatorToLatLng(maxX, maxY);

  const bounds = L.latLngBounds(southWest, northEast);
  const center = bounds.getCenter();

  // Create a map instance to use Leaflet's zoom calculation
  const map = L.map(document.createElement('div'));
  const zoom = map.getBoundsZoom(bounds);

  return { center: [center.lat, center.lng], zoom };
}

export function convertStringToDate(dateString) {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  return new Date(`${year}-${month}-${day}T00:00:00-04:00`);
}

// converts date to string like "20240828"
export function convertDateToString(date) {
  console.log('jeff', date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
}

// parses "2024-06-26_2024-07-19.napolygon.1yrdeparture.LAEA.img" into "20240719
export function parseDateString(inputString) {
  // Split the string by underscore and period
  const parts = inputString.split('_')[1].split('.');

  // Extract the date part (2024-07-19)
  const datePart = parts[0];

  // Remove hyphens and return only the digits
  return datePart.replace(/-/g, '');
}
