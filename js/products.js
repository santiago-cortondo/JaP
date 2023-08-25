let numero =localStorage.getItem("catID");

let URL_InfoAutos = `https://japceibal.github.io/emercado-api/cats_products/${numero}.json`;

fetch(URL_InfoAutos)
    .then(res => res.json())
    .then(res => {
        array = res.products;
        MostrarData(array)
    })

let productos = document.getElementById("productos");

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

    document.getElementById("ordenarAscendente").addEventListener("click", function(){
        array.sort((a, b) => a.cost - b.cost);
        MostrarData(array);
    });

    document.getElementById("ordenarDescendente").addEventListener("click", function(){
        array.sort((a, b) => b.cost - a.cost);
        MostrarData(array);
    });

    document.getElementById("ordenarRelevancia").addEventListener("click", function(){
        array.sort((a, b) => b.soldCount - a.soldCount);
        MostrarData(array);
    });

    const s = document.getElementById("search");
    s.value = "";
    s.addEventListener("input", () => {
        const val = clean(s.value);
        let fil = array.filter(e => clean(e.name).includes(val) || clean(e.description).includes(val));
        MostrarData(fil);
    });
    
});

function clean(s) {//https://stackoverflow.com/questions/5700636/using-javascript-to-perform-text-matches-with-without-accented-characters
    return s.normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}