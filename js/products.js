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
    productos.innerHTML = "";
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
    s.value = "";
    s.addEventListener("input", () => {
        const val = s.value.toLowerCase();
        let fil = array.filter(e => e.name.toLowerCase().includes(val) || e.description.toLowerCase().includes(val));
        MostrarData(fil);
    });
});