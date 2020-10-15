import { MyMap } from "./map.js";
import { addPhotoField } from "./add_photo_field.js";

_seputMap();
window.addPhotoField = addPhotoField;
window.deleteField = _deleteField;
window.selectClickedButton = _selectClickedButton;

//#region  Setup Map
function _seputMap() {
  const myMap = _createMap();
  _addAddMarkerOnClickTo(myMap);
}

function _createMap() {
  const initial_coordinates = [-22.5437332, -44.180075]; // Barra Mansa coordinates
  const map = new MyMap(initial_coordinates);
  return map;
}

function _addAddMarkerOnClickTo(myMap) {
  let marker;
  myMap.createdMap.on("click", (event) => {
    marker && myMap.createdMap.removeLayer(marker);
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    const coordinates = [lat, lng];
    document.querySelector("[name=lat]").value = lat;
    document.querySelector("[name=lng]").value = lng;
    marker = myMap.addMarker(coordinates);
  });
}
//#endregion

function _deleteField(event) {
  const urlsContainer = document.querySelector("#photos-urls-container");
  const canDeleteContainer = urlsContainer.children.length > 1;
  const spanField = event.currentTarget;
  const urlContainer = spanField.parentNode;
  if (!canDeleteContainer) {
    const input = urlContainer.children[0];
    input.value = "";
    return;
  }
  canDeleteContainer && urlsContainer.removeChild(urlContainer);
}

function _selectClickedButton(event) {
  const clickedButton = event.currentTarget;
  _unselectAllButtons();
  _selectButton(clickedButton);
  _atualizeFormValueFrom(clickedButton);
}

function _selectButton(button) {
  button.classList.add("active");
}

function _unselectAllButtons() {
  const buttons = document.querySelectorAll("#open-on-weekends-select button");
  buttons.forEach((button) => button.classList.remove("active"));
}

function _atualizeFormValueFrom(clickedButton) {
  const input = document.querySelector("#open-on-weekends");
  input.value = clickedButton.dataset.value;
}
