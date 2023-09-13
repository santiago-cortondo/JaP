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