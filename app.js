const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');  // Agrega esta línea para importar cors

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());  // Usa cors como middleware

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'matibasso',
  database: 'E-mercado',
  connectionLimit: 5,
});

app.post('/cart', (req, res) => {
    const items = req.body.items;

    // Preparar los datos para la inserción
    const values = items.map((item) => [
        item.name,
        item.count,
        item.unitCost,
        item.currency,
        item.image,
    ]);

    // Insertar datos en la base de datos
    const query = 'INSERT INTO cart (productName, productCount, productPrice, currency, imageURL) VALUES ?';

    pool.query(query, [values], (err, results) => {
        if (err) {
            console.error('Error al guardar ítems en la base de datos:', err);
            res.status(500).json({ error: 'Error al guardar los ítems del carrito.' });
        } else {
            res.status(200).json({ message: 'Ítems guardados correctamente.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
