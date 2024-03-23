require("dotenv").config();
const express = require("express"); 
const app = express();
const path = require("path");
const cors = require("cors");
app.use( express.json({ limit: "200mb",  }));
app.use(express.urlencoded({extended: true,  limit: "200mb", }));

app.set("views", path.join(__dirname, "./app/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//Routers
const loginRouter = require("./app/routers/login");

app.use("/", loginRouter);

app.listen(process.env.SERVER_PORT, function () {
  console.log(
    `Local Node app is listening at http://localhost:` + process.env.SERVER_PORT
  );
});