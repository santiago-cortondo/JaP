let URL_InfoAutos = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let array = [];

fetch(URL_InfoAutos)
    .then(res => res.json())
    .then(res => {
        array = res.products;
        MostrarData(res.products)
    })

let productos = document.getElementById("productos");

function MostrarData(dataArray) {
    productos.innerHTML += "";
    for (const item of dataArray) {
        productos.innerHTML += `
        <div class="cuadrante">
            <img src="${item.image}">
            <div>
                <h2>${item.name} ${item.currency} ${item.cost}</h2>
                <p class ="descripcion">${item.description}</p>
            </div>
            <div class ="vendidos">
                <span>${item.soldCount} vendidos</span>
            </div>
        </div>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const s = document.getElementById("search");
    s.addEventListener("input", () => {
        const val = s.value;
        let fil = array.filter(e => e.name.includes(val) || e.description.includes(val))
        MostrarData(fil);
    });
});

/*

que filtre en tiempo real (el evento input te será de ayuda) según el texto que se ingresa en dicho campo.
Incluye en la búsqueda el texto en el título y en la descripción de los artículos.
*/