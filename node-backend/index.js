const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { readdirSync } = require("fs");
const cors = require("cors");
const { auth, adminCheck } = require("./middleware/auth");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

let shifts = [];
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "support_schedule",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
