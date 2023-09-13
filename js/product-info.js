// Entrega3Parte3
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

function obtenerDatosDelProducto(productId) {
    let productInfoUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

    fetch(productInfoUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("No se pudo obtener la información del producto.");
        })
        .then(productData => {
            mostrarDatosDelProducto(productData);
        })
        .catch(error => {
            console.error(`Error: ${error.message}`);
        });
}

function mostrarDatosDelProducto(productData) {
    let productName = document.getElementById("nombre-producto");
    let productPrice = document.getElementById("precio-producto");
    let productDescription = document.getElementById("descripcion-producto");
    let productCategory = document.getElementById("categoria-producto");
    let productSoldCount = document.getElementById("vendidos-producto");
    let productImages = document.getElementById("imagenes-producto");

    productName.textContent = productData.name;

    if (productData.currency === "USD") {
        productPrice.textContent = `Precio: ${productData.currency} ${productData.cost}`;
    } else {
        productPrice.textContent = `Precio: ${productData.currency} ${productData.cost}`;
    }

    productDescription.textContent = `Descripción: ${productData.description}`;
    productCategory.textContent = `Categoría: ${productData.category}`;
    productSoldCount.textContent = `Vendidos: ${productData.soldCount}`;

    productImages.innerHTML = ""; 

    for (let imageSrc of productData.images) {
        let imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        productImages.appendChild(imgElement);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let productId = localStorage.getItem("prodID");

    if (productId) {
        obtenerDatosDelProducto(productId);
    }
});