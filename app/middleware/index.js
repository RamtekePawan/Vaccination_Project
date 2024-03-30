const jwt = require("jsonwebtoken");
const User = require("../models/userModel")


exports.verifyToken = async function (req, res, next) {

    let token = req.cookies.token;
    // console.log('token::>', token)
    if (!token) {
        return res.status(400).json({ status: false, message: "Token Expired Please Login Again !!!" });
    }
    try {
        //Veryfy token
        const verifiedToken = jwt.verify(token, process.env.JWT_PARSER_SECRET);
        // console.log("Verifed Token::>", verifiedToken)

        let response = await User.getUserByEmail(verifiedToken.user.email);
        let user = response.rows[0];

        if (!user) {
            return res.status(403).json({ status: false, message: "User not found!" });
        }
        req.user = user;
        // console.log('req.user::', req.user);
        next();
    } catch (error) {
        // Token verification failed (expired or invalid)
        console.error("Token verification failed:", error);
        // Redirect to login page
        res.redirect("/login");
    }
}

exports.userMiddleware = function(io){
  let loggedInUsers = [];

  io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('login', (email) => {
          loggedInUsers.push(email);
          io.emit('userCount', loggedInUsers.length);
          console.log('Number of users:', loggedInUsers.length);
      });

      socket.on('logout', (email) => {
          loggedInUsers = loggedInUsers.filter(userEmail => userEmail !== email);
          io.emit('userCount', loggedInUsers.length);
          console.log('Number of users:', loggedInUsers.length);
      });

      // Initial user count when a new client connects
      io.emit('userCount', loggedInUsers.length);
  });

  return (req, res, next) => {
    console.log('req::userMiddleware', req.body)
      req.io = io; 
      next();
  };
};