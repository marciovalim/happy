export class Map {
  constructor(coordinates, { options = null } = {}) {
    this._createMap(coordinates, options);
    this._createAndAddLayer();
  }

  _createMap(coordinates, options) {
    this.map = L.map("map", options).setView(coordinates, 14);
  }

  _createAndAddLayer() {
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      this.map
    );
  }

  addMarker(coordinate, { title = null } = {}) {
    const marker = this._createMarker(coordinate);
    marker.addTo(this.map);
    if (title != null) {
      this._createAndAddPopupToMarker(title, marker);
    }
  }

  _createAndAddPopupToMarker(title, marker) {
    const popup = this._createPopup(title);
    marker.bindPopup(popup);
  }

  _createMarker(coordinates) {
    const icon = this._createIcon();
    return L.marker(coordinates, { icon: icon });
  }

  _createIcon() {
    return L.icon({
      iconUrl: "./public/images/map-marker.svg",
      iconSize: [58, 68],
      iconAnchor: [29, 74],
      popupAnchor: [170, 2],
    });
  }

  _createPopup(title) {
    return L.popup({
      closeButton: false,
      className: "map-popup",
      minWidth: 240,
      minHeight: 240,
    }).setContent(
      `${title} \
        <a id='choose-orphanage-button' href='orphanage.html?id=1 class='choose-orphanage'> \
        <img src='./public/images/arrow-white.svg'> \
        </a>`
    );
  }
}
