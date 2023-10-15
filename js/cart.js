const USER_ID = 25801;
const CART_URL = `${CART_INFO_URL}${USER_ID}${EXT_TYPE}`;

/* // Obtener el tipo de envío seleccionado
const tipoEnvio = document.querySelector('input[name="tipoEnvio"]:checked').value;

// Obtener la dirección de envío
const calle = document.getElementById('calle').value;
const numero = document.getElementById('numero').value;
const esquina = document.getElementById('esquina').value; */

    document.addEventListener('DOMContentLoaded', async function () {
      try {
        // Petición Fetch al carrito de compras
        const response = await fetch(CART_URL);

        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }

        const cartData = await response.json();

        // Manipula los datos del carrito y muestra en HTML
        displayCartInfo(cartData);
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    });

    function displayCartInfo(cartData) {
      const cartTable = document.getElementById('cart-table-body');
      cartTable.innerHTML = ''; // Limpia contenido previo

      // Itera sobre los productos en el carrito y los imprime en la tabla
      cartData.articles.forEach(article => {
        
        const rowHtml = `
        <tr>
        <td id="logo"><img src="${article.image}" alt="Producto" style="max-width: 100px;"></td>
        <td id="nombre">${article.name}</td>
        <td id="precio">${article.currency+' '}<span class="precio">${article.unitCost}</span></td>
        <td><input type="number" class="form-control cantidad" style="width: 10vh;" min="1" value="${article.count}" onchange="recalcular();"></td>
        <td><b>${article.currency+" "}<span class="subtotal">${article.count * article.unitCost}</span></b></td>
      </tr>
        `;
        cartTable.innerHTML += rowHtml;
      });
    }

  function recalcular() {
  let cantidad = document.getElementsByClassName('cantidad');
  let resultado = document.getElementsByClassName('subtotal');
  let precio = document.getElementsByClassName('precio');
  
  for (let i = 0; i < precio.length; i++) {
    let cantidadValue = parseFloat(cantidad[i].value);
    let precioValue = parseFloat(precio[i].innerHTML);
    if (isNaN(cantidadValue)){
      cantidadValue = 1;
    }
    resultado[i].innerHTML = (cantidadValue * precioValue).toFixed(2);
    
  }
}

