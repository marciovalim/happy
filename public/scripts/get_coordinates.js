import { Geolocator } from "./geolocator.js";

const _defaultCoordinates = [-22.5437332, -44.180075]; // Barra Mansa coordinates
const _userCoordinatesKey = "userCoordinates";

export function getUserCoordinates() {
  return new Promise(async (resolve, _) => {
    if (!_storageHasUserCoordinates()) {
      console.log("storage does not has coordinates");
      await _getUserCoordinatesAndResolve(resolve);
    } else {
      console.log("storage have coordinates");
      _resolveWithStorageCoordinates(resolve);
    }
  });
}

async function _getUserCoordinatesAndResolve(resolve) {
  const userCoordinates = await _getUserCoordinatesOrDefault(undefined);
  if (userCoordinates != undefined) {
    console.log("save coordinates to storage");
    _setUserCoordinatesToStorage(userCoordinates);
    resolve(userCoordinates);
  } else {
    console.log("not save coordinates to storage");
    resolve(_defaultCoordinates);
  }
}

function _resolveWithStorageCoordinates(resolve) {
  resolve(_getUserCoordinatesFromStorage());
}

function _storageHasUserCoordinates() {
  return sessionStorage.getItem(_userCoordinatesKey) != null;
}

function _setUserCoordinatesToStorage(userCoordinates) {
  sessionStorage.setItem(_userCoordinatesKey, userCoordinates.toString());
}

function _getUserCoordinatesFromStorage() {
  const userCoordinatesInString = sessionStorage.getItem(_userCoordinatesKey);
  return userCoordinatesInString.split(",");
}

async function _getUserCoordinatesOrDefault(defaultCoordinatesArray) {
  const coordinates = await Geolocator.getCoordinatesInArrayOrDefault(
    defaultCoordinatesArray
  );
  return coordinates;
}
