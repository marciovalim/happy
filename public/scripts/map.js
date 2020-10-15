export class MyMap {
  constructor(coordinates, { options = null } = {}) {
    this.createdMap = this._createMap(coordinates, options);
    this._createAndAddLayer();
  }

  _createMap(coordinates, options) {
    return L.map("map", options).setView(coordinates, 14);
  }

  _createAndAddLayer() {
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      this.createdMap
    );
  }

  addMarker(coordinate, { title, id } = {}) {
    const marker = this._createMarker(coordinate);
    marker.addTo(this.createdMap);
    if (title != null) {
      this._createAndAddPopupToMarker({ title, marker, id });
    }
    return marker;
  }

  _createAndAddPopupToMarker({ title, id, marker } = {}) {
    const popup = this._createPopup(title, id);
    marker.bindPopup(popup);
  }

  _createMarker(coordinates) {
    const icon = this._createIcon();
    return L.marker(coordinates, { icon: icon });
  }

  _createIcon() {
    return L.icon({
      iconUrl: "/images/map-marker.svg",
      iconSize: [58, 68],
      iconAnchor: [29, 74],
      popupAnchor: [170, 2],
    });
  }

  _createPopup(title, id) {
    return L.popup({
      closeButton: false,
      className: "map-popup",
      minWidth: 240,
      minHeight: 240,
    }).setContent(
      `${title} \
        <a id='choose-orphanage-button' href='/orphanage?id=${id} class='choose-orphanage'> \
        <img src='/images/arrow-white.svg'> \
        </a>`
    );
  }
}
