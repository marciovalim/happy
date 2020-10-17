import { getUserCoordinates } from "./get_coordinates.js";
import { ReverseGeocoder } from "./reverse_geocoder.js";

_start();

async function _start() {
  const userCoordinates = await getUserCoordinates();
  const addressComponents = await ReverseGeocoder.getAddressComponents(
    userCoordinates
  );
  const cityNameElement = document.querySelector("#city");
  const stateNameElement = document.querySelector("#state");
  cityNameElement.textContent = addressComponents.city;
  stateNameElement.textContent = addressComponents.state;
  cityNameElement.parentNode.classList.add("animate-up");
}
