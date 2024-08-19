import L from 'leaflet';

// Function to convert Web Mercator (EPSG:3857) to WGS84 (EPSG:4326)
export function webMercatorToLatLng(x, y) {
    const lng = (x / 20037508.34) * 180;
    let lat = (y / 20037508.34) * 180;
    lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
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

export const convertStringToDate = (dateString) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return new Date(`${year}-${month}-${day}T00:00:00-04:00`);
};