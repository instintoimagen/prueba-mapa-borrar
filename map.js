const tilesProvider = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const latitud = -31.3882,
  longitud = -64.1888;
(latitud2 = -31.39), (longitud2 = -64.19);

let myMap = L.map("myMap").setView([latitud, longitud], 16);

L.tileLayer(tilesProvider, {
  maxZoom: 20,
}).addTo(myMap);

let marcador = L.marker([latitud, longitud]).addTo(myMap);

// En iconoSergio establezco el ícono que agregaré con un segundo marcador
let iconoSergio = L.icon({
  iconUrl: "marca.png",
  iconSize: [30, 45],
  // iconAnchor hace referencia a donde ubicamos la punta del marcador, o sea el punto que va a señalar. Como hemos definido el tamaño 30x45 (con iconSize), con iconAnchor diremos que desde el extremo izquierdo superior cuente 15 a la derecha y baje 45 hacia abajo, (quedando indicado abajo al medio). Así logramos que la punta de este icono esté en el punto donde marcamos la ubicación.
  iconAnchor: [15, 45],
});

let marcador2 = L.marker([latitud2, longitud2], { icon: iconoSergio }).addTo(
  myMap
);

function getGeolocation(id) {
  // Podemos acceder a la función de la geolocalización a través de navigator.geolocation (por eso no usamos ese nombre en esta función)

  const $id = document.getElementById(id),
    // La función que ejecuta la geolocalización necesita una serie de opciones:
    options = {
      // Que el dispositivo trate de hacer la mejor lectura posible, lo estamos "acelerando". Por default viene el false.
      enableHightAccuracy: true,
      // Tiempo en el cual estará esperando la respuesta para tomar la lectura.
      timeout: 5000,
      // Para evitar que se guarden en cache las lecturas. Que cada vez que se tomen lecturas no tenga de referencia la anterior.
      maximumAge: 0,
      // Se pueden ver más opciones en la documentación
    };

  const success = (position) => {
    $id.innerHTML = `<p><mark>Tu posición actual es:</mark></p>`;
    if (position.coords.altitude === null) {
      $id.innerHTML = `<ul>
    <li>Latitud: <b>${position.coords.latitude}</b></li>
    <li>Longitud: <b>${position.coords.longitude}</b></li>
    <li>Presición de GPS: <b>${position.coords.accuracy.toFixed(0)}m</b></li>
   </ul>
   `;
    } else {
      `<ul>
    <li>Latitud: <b>${position.coords.latitude}</b></li>
    <li>Longitud: <b>${position.coords.longitude}</b></li>
    <li>Altitud: <b>${position.coords.altitude}</b></li>
    <li>Presición de GPS: <b>${position.coords.accuracy.toFixed(0)}m</b></li>
   </ul>
   `;
    }
  };

  const error = (err) => {
    $id.innerHTML = `<p><mark>Error ${err.code}: ${err.message}</mark></p>`;
  };

  // En el método getCurrentPosition le damos los parámetro: (qué hacer si es exitosa la obtención de coordenadas, qué hacer si da error, y las opciones)
  navigator.geolocation.getCurrentPosition(success, error, options);

  // también existe el método "watchPosition" para ir actualizando la posición, lo que se usa por ejemplo para ver la ubicación en tiempo real, que se vaya desplazando.
  // navigator.geolocation.watchPosition;
}

document.addEventListener("DOMContentLoaded", (e) =>
  getGeolocation("datosGPS")
);
