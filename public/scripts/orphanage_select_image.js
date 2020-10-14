export function selectImage(event) {
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
