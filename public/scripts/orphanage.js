import { Map } from "./map.js";
import { selectImage } from "./orphanage_select_image.js";

_createMap();
window.selectImage = selectImage;

function _createMap() {
  const bm_coordinate = [-22.5437332, -44.180075];
  const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false,
  };

  const map = new Map(bm_coordinate, { options: options });
  map.addMarker(bm_coordinate);
}
