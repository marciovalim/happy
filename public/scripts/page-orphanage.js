const bm_coordinates = [-22.5437332, -44.180075];

const options = {
  dragging: false,
  touchZoom: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  zoomControl: false,
};

main(bm_coordinates);

function main(coordinates) {
  const map = _createMap(coordinates);
  _createAndAddLayer(map);
  _createAndAddMarker(map);
}

function _createMap(coordinates) {
  return L.map("map", options).setView(coordinates, 14);
}

function _createAndAddLayer(map) {
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
}

function _createAndAddMarker(map) {
  const marker = _createMarker();
  marker.addTo(map).bindPopup(popup);
}

function _createMarker() {
  const icon = _createIcon();
  return L.marker(bm_coordinates, { icon: icon });
}

function _createIcon() {
  return L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 74],
    popupAnchor: [170, 2],
  });
}
