require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const app = express(); 
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { verifyToken } = require("./app/middleware");

const httpServer = createServer(app);
const io = new Server(httpServer)


app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
console.log(__dirname);
app.set("views", path.join(__dirname, "./app/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Routers
const loginRouter = require("./app/routers/login");
const userRouter = require("./app/routers/user"); 

app.use("/", loginRouter);
app.use("/user", verifyToken, userRouter);


let userArr = []
io.on('connection' , function(socket){
  console.log(`New connection : ${socket.id}`);

  socket.on('loginSuccess', function(data){
    console.log('loginSuccess :::>>');
    if(!userArr.includes(data.email)){
      userArr.push(data.email);
      console.log("userArray::", userArr); 
    }  
    socket.emit('userCount', {count : userArr.length} )
  })

  socket.on('logoutSuccess', function(data){
    console.log('inside logoutSuccess::>', data);
    userArr = userArr.filter(email => email !==  data)
    console.log("userArray::", userArr);
    socket.send( {count : userArr.length} )
    socket.emit('userCount', {count : userArr.length} )
  })
 
})
// const userMiddlewareInstance = userMiddleware(io);
// app.use(userMiddlewareInstance);

const SERVER_PORT = process.env.SERVER_PORT || 3000; // Use port 3000 if SERVER_PORT is not set
httpServer.listen(SERVER_PORT, function () {
  console.log(`App listening at http://localhost:${SERVER_PORT}`);
});
