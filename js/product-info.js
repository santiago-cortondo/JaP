let comentarios = []
const prodID = localStorage.getItem("prodID") 
const URLComentarios = PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE


// función para mostrar cada uno de los comentarios en product-info.html
function mostrarComentarios() {
    contenidoHTML = ""
    comentarios.forEach((comentario) => {
        contenidoHTML += `
        <div class="card mb-3">
            <div class="">
                <p>${comentario.user} - ${comentario.dateTime}</p>
                <div>${estrellas(comentario.score)}</div>
                <p>${comentario.description}</p>
            </div>
        </div>`
    })

    document.getElementById("comentarios").innerHTML = contenidoHTML;
}


// función para mostrar estrellas en los comentarios
function estrellas(score) {
    let estrella = ``
    for (let i = 0; i < 5; i++) {
        if (i < score) {
            estrella += `<i class="fa fa-star checked"></i>`
        } else {
            estrella += `<i class="fa fa-star"></i>`
        }
    }

    return estrella;
}

document.addEventListener("DOMContentLoaded", () => {
    
    // obtener los comentarios del json
    getJSONData(URLComentarios).then((result) => {
        if (result.status === "ok") {
            comentarios = result.data;
            mostrarComentarios();
        }
    })

})
