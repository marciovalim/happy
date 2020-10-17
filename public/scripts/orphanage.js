import { MyMap } from "./map.js";

_createMap();
window.selectImage = _selectImage;
fillElementsWithData();
makeFirstImageEnabled();

function _createMap() {
  const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false,
  };

  const orphanageMapData = document.querySelector("#coordinatesData").dataset;
  const orphanageCoordinate = [orphanageMapData.lat, orphanageMapData.lng];
  const map = new MyMap(orphanageCoordinate, { options: options });
  map.addMarker(orphanageCoordinate);
}

function fillElementsWithData() {
  const orphanageData = document.querySelector("#orphanageData").dataset;
  const title = document.querySelector("#orphanage-name");
  title.textContent = orphanageData.name;
}

function makeFirstImageEnabled() {
  const firstImage = document.querySelector("#images button");
  firstImage.classList.add("active-image");
}

//#region  Select Image
function _selectImage(event) {
  const activeImageClass = "active-image";
  _removeActiveClassFromAllButtons(activeImageClass);
  const clickedButton = _getClickedButton(event);
  _addActiveClassToCurrentButton(clickedButton, activeImageClass);
  _atualizeImageDisplayFromButtonImage(clickedButton);
}

function _removeActiveClassFromAllButtons(activeImageClass) {
  const buttons = _findAllImagesButtons();
  _removeActiveImageClassFrom(buttons, activeImageClass);
}

function _findAllImagesButtons() {
  return document.querySelectorAll("#images button");
}

function _removeActiveImageClassFrom(buttons, activeImageClass) {
  buttons.forEach((button) => {
    button.classList.remove(activeImageClass);
  });
}

function _getClickedButton(event) {
  return event.currentTarget;
}
function _addActiveClassToCurrentButton(clickedButton, activeImageClass) {
  clickedButton.classList.add(activeImageClass);
}

function _atualizeImageDisplayFromButtonImage(clickedButton) {
  const clickedImage = _getClickedImage(clickedButton);
  _atualizeImageDisplay(clickedImage);
}

function _atualizeImageDisplay(clickedImage) {
  const imageDisplay = _findImageDisplay();
  _atualizedImage(imageDisplay, clickedImage);
}

function _getClickedImage(clickedButton) {
  return clickedButton.children[0];
}

function _findImageDisplay() {
  return document.querySelector("#image-display");
}

function _atualizedImage(imageDisplay, clikedImage) {
  imageDisplay.src = clikedImage.src;
}
//#endregion
