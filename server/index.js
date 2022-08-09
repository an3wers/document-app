const express = require("express");
const db = require("./db.js");
const cors = require('cors')

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}))

let test = [{ text: "Hello world" }];

app.get("/", (req, res) => {
  res.status(200).json(test);
});

app.post("/api/documents/create", (req, res, next) => {

  const sql =
    "INSERT INTO documents (lastname, firstname, patronymic, series, number) VALUES (?,?,?,?,?)";
  const params = [
    req.body.lastname,
    req.body.firstname,
    req.body.patronymic,
    req.body.series,
    req.body.number,
  ];
  db.run(sql, params, (error, result) => {
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    } else {
      res.json({
        message: "success",
        data: req.body,
      });
    }
  });
});

app.get("/api/documents/list", (req, res) => {
  const sql = "select * from documents";
  const params = [];

  db.all(sql, params, (error, rows) => {
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.post("/api/documents/search", (req, res) => {
  // ${req.body.search} => '?'
  const sql = `
    select * from documents 
      where 
      lastname like '%${req.body.search}%' or 
      firstname like '%${req.body.search}%' or 
      patronymic like '%${req.body.search}%'or 
      series like '%${req.body.search}%' or 
      number like '%${req.body.search}%' `;

  const params = [];

  db.all(sql, params, (error, rows) => {
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.post("/api/documents/detail", (req, res, next) => {

  const sql = `select * from documents where id=${req.body.id}`;
  const params = [];
  db.all(sql, params, (error, rows) => {
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    } else {
      res.json({
        message: "success",
        data: rows.length != 0 ? rows[0] : {},
      });
    }
  });
});

app.use(function (req, res) {
  res.status(404);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
