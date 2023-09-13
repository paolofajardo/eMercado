let prodID = JSON.parse(localStorage.getItem("prodID")); // Obteniendo prodID de localStorage
let urlPROD = PRODUCT_INFO_URL + prodID + EXT_TYPE; // Generando URL concatenando variables desde init.js y prodID desde localStorage
let urlCOMENTS = PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE;// Generando Url concatenando variables para traer los comentarios independientemente por cada id.
let currentProd;

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(urlPROD).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProd = resultObj.data;
            showProductInfo();
            showImagesHtml();
            showComments();
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

function showComments() {
    // Realiza una solicitud GET a la URL de los comentarios
    getJSONData(urlCOMENTS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let comments = resultObj.data;

            // Construye el HTML para mostrar los comentarios
            let htmlContentToAppend = '<h4>Comentarios</h4>';

            for (let i = 0; i < comments.length; i++) {
                let comment = comments[i];

                // Calcula la cantidad de estrellas llenas y vacías según el puntaje
                let checkedStars = Math.floor(comment.score);
                let emptyStars = 5 - checkedStars;

                // Crea un contenedor para las estrellas
                let starContenedor = '<div class="stars-container">';

                // Agrega las estrellas llenas
                for (let i = 0; i < checkedStars; i++) {
                    starContenedor += '<span class="fa fa-star checked"></span>';
                }

                // Agrega las estrellas vacías
                for (let i = 0; i < emptyStars; i++) {
                    starContenedor += '<span class="fa fa-star"></span>';
                }

                // Cierra el contenedor de estrellas
                starContenedor += '</div>';

                htmlContentToAppend += `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h6 class="card-title">${comment.user}</h6>
                            ${starContenedor}
                            <small class="text-muted">${comment.dateTime}</small>
                            <p class="card-text">${comment.description}</p>
                        </div>
                    </div>
                `;
            }

            // Agrega los comentarios al elemento con id "comments-section"
            document.getElementById("comments-section").innerHTML = htmlContentToAppend;
        }
    });
}

document.getElementById('btn-comment').addEventListener('click', function () {

let htmlContentToAppend = ''
    
//    let checkedStars = Math.floor(newStarContenedor);
//    let starContenedor = '<div class="stars-container">';
//    let emptyStars = 5 - checkedStars;

let newUser = JSON.parse(localStorage.getItem('usuario') || sessionStorage.getItem('usuario'))
const newDateTime = new Date().toISOString()
const newDescription = document.getElementById('comment-product').value;
let starRate = document.getElementById('rate-star').value;
let starContainer = '<div class="stars-container">';
let checkedStars = Math.floor(starRate);
let emptyStars = 5 - checkedStars;

    // Agrega las estrellas llenas
    for (let i = 0; i < checkedStars; i++) {
        starContainer += '<span class="fa fa-star checked"></span>';
    }
    // Agrega las estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        starContainer += '<span class="fa fa-star"></span>';
    }
    // Cierra el contenedor de estrellas
    starContainer += '</div>';

    htmlContentToAppend += `
    <div class="card mb-3">
        <div class="card-body">
            <h6 class="card-title">${newUser.email}</h6>
            ${starContainer}
            <small class="text-muted">${newDateTime}</small>
            <p class="card-text">${newDescription}</p>
        </div>
    </div>
`;

    document.getElementById('comments-section-new').innerHTML += htmlContentToAppend;
});