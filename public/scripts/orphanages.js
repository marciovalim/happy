import { MyMap } from "./map.js";

const bm_coordinate = [-22.5437332, -44.180075];
const map = new MyMap(bm_coordinate);
map.addMarker(bm_coordinate, { title: "Lar das meninas" });

const orphanagesData = document.querySelectorAll(".orphanagesData");
orphanagesData.forEach((orphanageData) => {
  const coordinates = [orphanageData.dataset.lat, orphanageData.dataset.lng];
  const title = orphanageData.dataset.name;
  const id = orphanageData.dataset.id;
  map.addMarker(coordinates, { title, id });
});
