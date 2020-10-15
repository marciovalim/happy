import { MyMap } from "./map.js";

const bm_coordinate = [-22.5437332, -44.180075];
const map = new MyMap(bm_coordinate);
map.addMarker(bm_coordinate, { title: "Lar das meninas" });
