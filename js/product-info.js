let comentarios = []
const prodID = localStorage.getItem("prodID") 
const urlInfoComentarios = PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE


// Función que recibe por parámetro un array y muestra sus elementos en pantalla
// function showList(array) {
//   const container = document.getElementById("list");
//   container.innerHTML = "";

//   array.forEach((element) => {
//     const li = document.createElement("li");
//     li.appendChild(document.createTextNode(element));
//     container.appendChild(li);
//   });
// }

// función para mostrar cada uno de los comentarios en product-info.html
function mostrarComentarios() {
    contenidoHTML = ""
    comentarios.forEach((comentario) => {
        // contenidoHTML += ...
        // acá iría el html
    })
}

document.addEventListener("DOMContentLoaded", () => {
    
})
