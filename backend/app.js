const express = require("express");
const fs = require('fs');
const path = require('path');
const cors = require("cors");
const jwt = require('jsonwebtoken');


const app = express();
const port = 5500;

const secretKey = 'chicheKey';

app.use(express.json())

app.use(cors());

/* app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); */

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

app.get('/prueba', (req,res) => {
  res.send('esto es una mierda')
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
  