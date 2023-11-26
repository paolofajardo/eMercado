const express = require("express");
const fs = require('fs');
const path = require('path');
const cors = require("cors");
const mariadb = require('mariadb');


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

const pool = mariadb.createPool({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '123',
  database: 'e-mercado',
  connectionLimit: 5,
});

app.get("/", (req, res) => {
    res.send("<h1>hola</h1>");
  });
  
  app.get("/cart", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        "SELECT id, name, count, unitCost, currency, image FROM cart"
      );
  
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Se rompió el servidor" });
    } finally {
      if (conn) conn.release(); //release to pool
    }
  });

app.post("/cart", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
  
      const response = await conn.query(
        `INSERT INTO cart(id, name, count, unitCost, currency, image) VALUES (?, ?, ?, ?, ?, ?)`,
        [req.body.id, req.body.name, req.body.count, req.body.unitCost, req.body.currency, req.body.image]
      );
  
      res.json({
        id: req.body.id,
        name: req.body.name,
        count: req.body.count,
        unitCost: req.body.unitcost,
        currency: req.body.currency,
        image: req.body.image
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Se rompió el servidor" });
    } finally {
      if (conn) conn.release(); // release to pool
    }
  });

  app.put("/cart/:id", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query(
        `UPDATE cart SET count=? WHERE id=?`,
        [req.body.count, req.params.id]
      );    
  
      res.json({ id: req.params.id, ...req.body });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Se rompió el servidor" });
    } finally {
      if (conn) conn.release(); //release to pool
    }
  });

  app.delete("/cart/:id", async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("DELETE FROM cart WHERE id=?", [
        req.params.id,
      ]);
      res.json({ message: "Elemento eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Se rompió el servidor" });
    } finally {
      if (conn) conn.release(); //release to pool
    }
  });

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
  