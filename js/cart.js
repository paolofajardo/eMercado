const USER_ID = 25801;
const CART_URL = `${CART_INFO_URL}${USER_ID}${EXT_TYPE}`;

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
        const subtotal = article.count * article.unitCost;
        const rowHtml = `
        <tr>
        <td id="logo"><img src="${article.image}" alt="Producto" style="max-width: 100px;"></td>
        <td id="nombre">${article.name}</td>
        <td id="precio">${article.currency}  ${article.unitCost}</td>
        <td><input type="number" class="form-control" style="width: 10vh;" min="0" value="${article.count}" id="cantidad"></td>
        <td id="subtotal">${article.currency}  ${subtotal}</td>
      </tr>
        `;
        cartTable.innerHTML += rowHtml;
      });
    }