const express = require("express");
const fs = require('fs');
const path = require('path');
const cors = require("cors");


const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

/* app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); */

app.use(express.static('emercado-api-main'));
app.use(express.static('frontend'));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
  