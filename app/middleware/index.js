const jwt = require("jsonwebtoken");
const User = require("../models/userModel")


exports.verifyToken = async function (req, res, next) {

    let token = req.cookies.token;
    console.log('token::>', token)
    if (!token) {
        return res.status(400).json({ status: false, message: "Token Expired Please Login Again !!!" });
    }
    try {
        //Veryfy token
        const verifiedToken = jwt.verify(token, process.env.JWT_PARSER_SECRET);
        console.log("Verifed Token::>", verifiedToken)

        let response = await User.getUserByEmail(verifiedToken.user.email);
        let user = response.rows[0];

        if (!user) {
            return res.status(403).json({ status: false, message: "User not found!" });
        }
        req.user = user;
        console.log('req.user::', req.user);
        next();
    } catch (error) {
        // Token verification failed (expired or invalid)
        console.error("Token verification failed:", error);
        // Redirect to login page
        res.redirect("/login");
    }
}