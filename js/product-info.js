let prodID = JSON.parse(localStorage.getItem("prodID")); // Obteniendo prodID de localStorage
let urlPROD = PRODUCT_INFO_URL + prodID + EXT_TYPE; // Generando URL concatenando variables desde init.js y prodID desde localStorage
let currentProd;

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(urlPROD).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProd = resultObj.data;
            showProductInfo();
            showImagesHtml();
        }
    });
});



function showProductInfo() {
    let htmlContentToAppend = "";

    htmlContentToAppend += `
            <div><h4>${currentProd.name}</h4></div>
            <div class="input-group mb-3 align-items-center">
              <div class="price-fontstyle">${currentProd.currency}&nbsp;${currentProd.cost}</div>
              <span class="text-muted font-small pl-5">&nbsp;&nbsp;&nbsp;| +${currentProd.soldCount} vendidos</span>
            </div>
            <div class="fs-6 pt-1 pb-3">
                <h6><strong>Descripción</strong></h5>${currentProd.description}
            </div>
            <div class="col-12">
                <input type="button" value="Agregar Carrito" id="agregar-carrito" class="btn btn-outline-dark btn-sm">
            </div>
        `;
         //fs-x es como un hx

    document.getElementById("prod-info").innerHTML = htmlContentToAppend;
};

function showImagesHtml() {
    let htmlImages = `
    <div id="ProductCarousel" class="carousel carousel-dark slide img-thumbnail" data-bs-ride="carousel">
        <div class="carousel-indicators">
        `;

    for (let i = 0; i < currentProd.images.length; i++) {
        if (i === 0) {

            htmlImages += '<button type="button" data-bs-target="#ProductCarousel" data-bs-slide-to="' + i + '" class="active" aria-current="true" aria-label="Slide ' + i + '"></button>';
        } else {
            htmlImages += '<button type="button" data-bs-target="#ProductCarousel" data-bs-slide-to="' + i + '" aria-current="true" aria-label="Slide ' + i + '"></button>';
        }
    }

    htmlImages += '</div>' + 
        '<div class="carousel-inner">';

    for (let i = 0; i < currentProd.images.length; i++) {
        if (i === 0) {
            htmlImages += `
            <div class="carousel-item active" data-bs-interval="10000">
            <img class="d-block w-100" src="${currentProd.images[i]}" alt="${currentProd.id + '-' + i}" ></img></div>
            `;
        } else {
            htmlImages += `
            <div class="carousel-item" data-bs-interval="2000">
            <img class="d-block w-100" src="${currentProd.images[i]}" alt="${currentProd.id + '-' + i}" ></img></div>
            `;
        }
    }

    htmlImages += `
        <button class="carousel-control-prev" type="button" data-bs-target="#ProductCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#ProductCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
        </button>
        </div>
        </div>
        `;

    document.getElementById("prod-carrousel").innerHTML = htmlImages;
};