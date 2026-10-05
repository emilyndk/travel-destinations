const express = require("express");
const app = express();
const port = 3000;
const pool = require("./db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World2!");
});

app.get("/destinations", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM destinations");
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error connecting to database" });
  }
});

app.post("/destinations", async (req, res) => {
  console.log(req.body);
  res.status(201).send({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
