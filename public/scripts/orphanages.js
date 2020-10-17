import { MyMap } from "./map.js";

const initial_coordinate = [-22.5437332, -44.180075]; // Barra Mansa coordinate
const map = new MyMap(initial_coordinate);

const orphanagesData = document.querySelectorAll(".orphanagesData");
orphanagesData.forEach((orphanageData) => {
  const coordinates = [orphanageData.dataset.lat, orphanageData.dataset.lng];
  const title = orphanageData.dataset.name;
  const id = orphanageData.dataset.id;
  map.addMarker(coordinates, { title, id });
});
