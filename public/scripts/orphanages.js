import { MyMap } from "./map.js";
import { getUserCoordinates } from "./get_coordinates.js";

start();

async function start() {
  const coordinates = await getUserCoordinates();
  const map = new MyMap(coordinates);
  _addOrphangesToMap(map);
}

function _addOrphangesToMap(map) {
  const orphanagesData = document.querySelectorAll(".orphanagesData");
  orphanagesData.forEach((orphanageData) => {
    const coordinates = [orphanageData.dataset.lat, orphanageData.dataset.lng];
    const title = orphanageData.dataset.name;
    const id = orphanageData.dataset.id;
    map.addMarker(coordinates, { title, id });
  });
}
