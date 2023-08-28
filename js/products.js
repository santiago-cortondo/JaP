let numero = localStorage.getItem("catID");

let URL_InfoAutos = `https://japceibal.github.io/emercado-api/cats_products/${numero}.json`;

let arrayOriginal = [];
let filtroBusqueda = null;
let filtroPrecio = null;
let orden = null;

fetch(URL_InfoAutos)
    .then(res => res.json())
    .then(res => {
        arrayOriginal = res.products;
        MostrarData(arrayOriginal);
    })

let productos = document.getElementById("productos");

function recalcular() {
    let arr = arrayOriginal;
    if(filtroPrecio)
        arr = arr.filter(filtroPrecio);
    if(filtroBusqueda)
        arr = arr.filter(filtroBusqueda);
    arr.sort(orden);
    MostrarData(arr);
}

function MostrarData(dataArray) {
    productos.innerHTML = "";
    for (const item of dataArray) {
        productos.innerHTML += `
        <div class="cuadrante">
          <img src="${item.image}">
          <div class="contenido">
            <h2>${item.name} ${item.currency} ${item.cost}</h2>
            <p class="descripcion">${item.description}</p>
          </div>
          <div class="vendidos">
            <span>${item.soldCount} vendidos</span>
          </div>
        </div>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("precioMin").value = "";
    document.getElementById("precioMax").value = "";

    let filtroAscendente = document.getElementById("ordenarAscendente");
    filtroAscendente.addEventListener("click", function () {
        orden = (a, b) => a.cost - b.cost;
        recalcular();
    });

    let FiltroDescente = document.getElementById("ordenarDescendente");
    FiltroDescente.addEventListener("click", function () {
        orden = (a, b) => b.cost - a.cost;
        recalcular();
    });

    let FiltroVendidos = document.getElementById("ordenarRelevancia");
    FiltroVendidos.addEventListener("click", function () {
        orden = (a, b) => b.soldCount - a.soldCount;
        recalcular();
    });

    const busqueda = document.getElementById("search");
    busqueda.value = "";
    busqueda.addEventListener("input", () => {
        const querry = clean(busqueda.value);
        if(querry.length>0)
            filtroBusqueda = elem => clean(elem.name).includes(querry) || clean(elem.description).includes(querry)
        else
            filtroBusqueda = null;
        recalcular();
    });

    document.getElementById("aplicarFiltroPrecio").addEventListener("click", function () {
        const precioMin = parseFloat(document.getElementById("precioMin").value);
        const precioMax = parseFloat(document.getElementById("precioMax").value);

        if (!isNaN(precioMin) && !isNaN(precioMax)) {
            filtroPrecio = producto => {
                return producto.cost >= precioMin && producto.cost <= precioMax;
            };
        } else if (!isNaN(precioMin) || !isNaN(precioMax)) {
            filtroPrecio = producto => {
                return producto.cost >= precioMin || producto.cost <= precioMax;
            };
        } else {
            filtroPrecio = null;
        }

        recalcular();
    });

    document.getElementById("limpiarFiltroPrecio").addEventListener("click", function () {
        document.getElementById("precioMin").value = "";
        document.getElementById("precioMax").value = "";

        filtroPrecio = null;
        recalcular();
    });

});


function clean(filtrador) {//https://stackoverflow.com/questions/5700636/using-javascript-to-perform-text-matches-with-without-accented-characters
    return filtrador.normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}