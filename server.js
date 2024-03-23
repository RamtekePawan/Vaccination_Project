require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

app.set("views", path.join(__dirname, "./app/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Routers
const loginRouter = require("./app/routers/login");

app.use("/", loginRouter); 

const SERVER_PORT = process.env.SERVER_PORT || 3000; // Use port 3000 if SERVER_PORT is not set
app.listen(SERVER_PORT, function () {
  console.log(`App listening at http://localhost:${SERVER_PORT}`);
});
