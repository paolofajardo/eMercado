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


// Middleware para verificar el token
function verificarToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Token no proporcionado' });
  }
}

// Ruta GET para /cart
app.get('/cart', verificarToken, (req, res) => {
  res.status(200).json({ message: "Obtener información del carrito" });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
