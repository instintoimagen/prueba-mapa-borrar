const tilesProvider = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

let myMap = L.map("myMap").setView([-31.39, -64.18], 15);

L.tileLayer(tilesProvider, {
  maxZoom: 18,
}).addTo(myMap);
