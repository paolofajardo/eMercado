let currentProductsArray = [];
let catID = JSON.parse(localStorage.getItem("catID")); // Obteniendo catID de localStorage
let urlCAT = PRODUCTS_URL + catID + EXT_TYPE; // Generando URL concatenando variables desde init.js y catID desde localStorage
let minCount = undefined;
let maxCount = undefined;

/* 
Una vez obtenido el urlCAT utilizamos el getJSONData para traer todos los productos del API y los cargamos
en currentProductArray para poder trabajar con ellos.
Y seteamos el nombre de la categoria para poder mostrarlo.
*/
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(urlCAT).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products;
            setCategoryName(resultObj.data.catName);
            showProductsList();
        }
    });
});


function setProductID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

// Nombre de categoria variabe en subtitulo en negrita
function setCategoryName(newCategoryName) {
    var categoryName = document.getElementById("category-name");
    categoryName.innerHTML = newCategoryName;
    categoryName.style.fontWeight = "bold";

}

function showProductsList() {
    let htmlContentToAppend = "";

    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

        htmlContentToAppend += `
        <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name} - ${product.currency}&nbsp;${product.cost}</h4>
                        <small class="text-muted">${product.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                </div>
            </div>
        </div>
        `;
        }
    document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
    }
}

document.getElementById("A-Z").addEventListener('click', () => {
    result = currentProductsArray.sort(function(a, b) {
        if ( a.name < b.name ){ return -1; }
        if ( a.name > b.name ){ return 1; }
        return 0;
    });
    showProductsList()
    return result;
});

document.getElementById("Z-A").addEventListener('click', () => {
    result = currentProductsArray.sort(function(a, b) {
        if ( a.name > b.name ){ return -1; }
        if ( a.name < b.name ){ return 1; }
        return 0;
    });
    showProductsList()
    return result;
});

document.getElementById("porCantidad").addEventListener('click', () => {
    result = currentProductsArray.sort(function(a, b) {
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);

        if ( aCount > bCount ){ return -1; }
        if ( aCount < bCount ){ return 1; }
        return 0;
    });
    showProductsList()
    return result;
});

document.getElementById("filtroRango").addEventListener('click', () => {
    minCount = document.getElementById("filtroRangoMin").value;
    maxCount = document.getElementById("filtroRangoMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    showProductsList()
});

document.getElementById("limpiarFiltroRango").addEventListener('click', () => {
    document.getElementById("filtroRangoMin").value = "";
    document.getElementById("filtroRangoMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showProductsList()
});