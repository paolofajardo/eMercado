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


// Definir el middleware de autenticación
function verificarToken(req, res, next) {
  const token = req.headers.authorization; // Se asume que el token se envía en el encabezado de autorización

  if (token) {
    // Verificar el token utilizando la clave secreta
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ mensaje: 'Token inválido' });
      } else {
        // Si el token es válido, se permite que la solicitud continúe
        req.usuario = decoded.usuario; // Almacenar el usuario en el objeto de solicitud para su uso posterior
        next();
      }
    });
  } else {
    res.status(401).json({ mensaje: 'Token no proporcionado' });
  }
}

// Middleware para proteger la ruta /cart
app.get('/cart', verificarToken, (req, res) => {
  // Esta función se ejecutará solamente si el token es válido
  // Aquí puedes colocar la lógica para la ruta /cart
});

  



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
