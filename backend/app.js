const express = require("express");
const fs = require('fs');
const path = require('path');
const cors = require("cors");
const jwt = require('jsonwebtoken');


const app = express();
const port = 3000;

const secretKey = 'chicheKey';

app.use(express.json())

app.use(cors());


app.use(express.static('emercado-api-main'));
app.use(express.static('frontend'));

// Endpoint POST /login
app.post('/login', (req, res) => {
  const { usuario } = req.body;

  if (usuario) {
      const token = jwt.sign({usuario}, secretKey, { expiresIn: '1h' });
      res.status(200).json({ mensaje: 'Autenticación exitosa', token });
  } else {
      res.status(401).json({ mensaje: 'Autenticación fallida' });
  }
});


app.use("/cart", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["Authorization"], secretKey);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

// Ruta GET para /cart
app.get("/cart", (req, res) => {
  // Si el middleware pasa la autorización, se ejecutará esta parte
  // Aquí puedes devolver la información del carrito o realizar operaciones relacionadas con él
  res.status(200).json({ message: "Obtener información del carrito" });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
