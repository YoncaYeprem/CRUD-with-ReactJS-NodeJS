const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "crud",
  port: "3306",
});

app.post("/api/add-movie", (req, res) => {
  const seriesName = req.body.seriesName;
  const seasonNumber = req.body.seasonNumber;
  const category = req.body.category;
  const status = req.body.status;

  db.query(
    "INSERT INTO series (seriesName, seasonNumber, category,status) VALUES (?,?,?,?)",
    [seriesName, seasonNumber, category, status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(200);
      }
    }
  );
});

app.get("/api/series", (req, res) => {
  db.query("SELECT * FROM series", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/update", (req, res) => {
  const id = req.body.id;
  const seriesName = req.body.seriesName;
  const seasonNumber = req.body.seasonNumber;
  const category = req.body.category;
  const status = req.body.status;
  db.query(
    "UPDATE series SET seriesName=? , seasonNumber=?, category=?, status=? WHERE id = ?",
    [seriesName, seasonNumber, category, status, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/api/search/:category", (req, res) => {
  const category = req.params.category;
  db.query(
    "SELECT * FROM series WHERE category = ?",
    category,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM series WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
