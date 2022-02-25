export default function networkStatus() {
  const isOnLine = () => {
    const $div = document.createElement("div");
    if (navigator.onLine) {
      // Si la propiedad online del navigator valida a true, entonces creará dinámicamente un div en el HTML:
      $div.textContent = "Vuelves a tener conexión";
      $div.classList.remove("offline");
      $div.classList.add("online");
    } else {
      $div.textContent = "Se perdió la conexión";
      $div.classList.remove("online");
      $div.classList.add("offline");
    }
    document.body.insertAdjacentElement("afterbegin", $div);
    setTimeout(() => document.body.removeChild($div), 2000);
  };
  window.addEventListener("online", (e) => isOnLine());
  window.addEventListener("offline", (e) => isOnLine());
}
