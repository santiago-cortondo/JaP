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

   let filtroAscendente = document.getElementById("ordenarAscendente");
   filtroAscendente.addEventListener("click", function(){
    array.sort((a, b) => a.cost - b.cost);
    MostrarData(array);
});
   
let FiltroDescente = document.getElementById("ordenarDescendente");
    FiltroDescente.addEventListener("click", function(){
        array.sort((a, b) => b.cost - a.cost);
        MostrarData(array);
    });

 let FiltroVendidos =   document.getElementById("ordenarRelevancia");
    FiltroVendidos.addEventListener("click", function(){
        array.sort((a, b) => b.soldCount - a.soldCount);
        MostrarData(array);
    });

    const Buscador = document.getElementById("search");
    Buscador.value = "";
    Buscador.addEventListener("input", () => {
        const val = clean(Buscador.value);
        let fil = array.filter(Filtrado => clean(Filtrado.name).includes(val) || clean(Filtrado.description).includes(val));
        MostrarData(fil);
    });
    
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("aplicarFiltroPrecio").addEventListener("click", function(){
      const precioMin = parseFloat(document.getElementById("precioMin").value);
      const precioMax = parseFloat(document.getElementById("precioMax").value);

      if (!isNaN(precioMin) || !isNaN(precioMax)) {
          const productosFiltradosPorPrecio = array.filter(producto => {
              return producto.cost >= precioMin || producto.cost <= precioMax;
          });

          MostrarData(productosFiltradosPorPrecio);
      }
  });

  document.getElementById("limpiarFiltroPrecio").addEventListener("click", function(){
      document.getElementById("precioMin").value = "";
      document.getElementById("precioMax").value = "";

      MostrarData(array);
  });
 
});


function clean(filtrador) {//https://stackoverflow.com/questions/5700636/using-javascript-to-perform-text-matches-with-without-accented-characters
    return filtrador.normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}