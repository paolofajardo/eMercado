const USER_ID = 25801;
const CART_URL = `${CART_INFO_URL}${USER_ID}${EXT_TYPE}`;

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Comprueba si el carrito ya contiene el producto precargado
const peugeot208 = carrito.find(product => product.name === "Peugeot 208");

if (!peugeot208) {
  // Si no existe, se agrega
  const product = {
    id: 50924,
    name: "Peugeot 208",
    count: 1,
    unitCost: 15200,
    currency: "USD",
    image: "img/prod50924_1.jpg",
  };

  carrito.push(product);

  // Actualiza el carrito en el Local Storage
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await fetch(CART_URL);

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const cartData = await response.json();

    displayCart(cartData);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
  }
  
  displayCart();
});

function displayCart(cartData) {
  const cartTable = document.getElementById('cart-table-body');
  cartTable.innerHTML = ''; // Limpia contenido previo

  // Se obtienen los datos del carrito desde el localStorage
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Itera sobre los productos en el carrito y se muestran en la tabla
  carrito.forEach(product => {
    const rowHtml = `
      <tr>
        <td id="logo"><img src="${product.image}" alt="Producto" style="max-width: 110px;"></td>
        <td id="nombre">${product.name}</td>
        <td id="precio">${product.currency + ' '}<span class="precio">${product.unitCost}</span></td>
        <td><input type="number" class="form-control cantidad" style="width: 10vh;" min="1" value="${product.count}" onchange="recalcular();"></td>
        <td><b>${product.currency + ' '}<span class="subtotal">${product.count * product.unitCost}</span></b></td>
        <td>
          <a href="#" class="eliminar-articulo" data-product-id="${product.id}">
            <i class="fas fa-trash-alt text-danger"></i> </a>
        </td>
      </tr>
    `;
    cartTable.innerHTML += rowHtml;
  });
  

  // Agrega de nuevo los manejadores de eventos para los botones de eliminar
  const eliminarBotones = document.querySelectorAll('.eliminar-articulo');
  eliminarBotones.forEach(boton => {
    boton.addEventListener('click', function() {
      eliminarProducto(this);
    });
  });
}

function eliminarProducto(botonEliminar) {
  const fila = botonEliminar.parentElement.parentElement; // Obtiene la fila
  const nombreProducto = fila.querySelector('#nombre').innerText; // Obtiene el nombre del producto

  // Encuentra y elimina el producto del carrito
  const indice = carrito.findIndex(producto => producto.name === nombreProducto);
  if (indice !== -1) {
    carrito.splice(indice, 1);
  }

  // Actualiza el carrito en el Local Storage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Actualiza la vista del carrito
  displayCart();
  recalcular();
}

function recalcular() {
  let cantidad = document.getElementsByClassName('cantidad');
  let resultado = document.getElementsByClassName('subtotal');
  let precio = document.getElementsByClassName('precio');

  for (let i = 0; i < precio.length; i++) {
    let cantidadValue = parseFloat(cantidad[i].value);
    let precioValue = parseFloat(precio[i].querySelector('.precio').innerHTML);
    if (isNaN(cantidadValue)) {
      cantidadValue = 1;
    }
    resultado[i].innerHTML = (cantidadValue * precioValue).toFixed(2);
  }
}

