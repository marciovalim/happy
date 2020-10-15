export function addPhotoField() {
  const duplicatedField = _duplicateLastField();
  const duplicatedInput = _getInput(duplicatedField);
  if (!_createNewFieldIsValid(duplicatedInput)) {
    return;
  }
  _cleanInput(duplicatedInput);
  _addFieldToUrlsContainer(duplicatedField);
}

function _duplicateLastField() {
  const fieldToDuplicate = _getLastField();
  const duplicatedField = fieldToDuplicate.cloneNode(true);
  return duplicatedField;
}

function _getLastField() {
  const urlFields = _getUrlsFields();
  return urlFields[urlFields.length - 1];
}

function _getUrlsFields() {
  return document.querySelectorAll(".new-upload");
}

function _getInput(duplicatedField) {
  return duplicatedField.children[0];
}

function _createNewFieldIsValid(duplicatedInput) {
  return duplicatedInput.value != "";
}

function _cleanInput(input) {
  input.value = "";
}

function _addFieldToUrlsContainer(newField) {
  const urlsContainer = document.querySelector("#photos-urls-container");
  urlsContainer.appendChild(newField);
}
