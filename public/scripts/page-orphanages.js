const bm_coordinates = [-22.5437332, -44.180075];

main(bm_coordinates);

function main(coordinates) {
  const map = _createMap(coordinates);
  _createAndAddLayer(map);
  _createAndAddMarker(map);
}

function _createMap(coordinates) {
  return L.map("map").setView(coordinates, 14);
}

function _createAndAddLayer(map) {
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
}

function _createAndAddMarker(map) {
  const popup = _createPopup();
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

function _createPopup() {
  return L.popup({
    closeButton: false,
    className: "map-popup",
    minWidth: 240,
    minHeight: 240,
  }).setContent(
    "Lar das meninas \
    <a id='choose-orphanage-button' href='orphanage.html?id=1 class='choose-orphanage'> \
        <img src='./public/images/arrow-white.svg'> \
    </a>"
  );
}
