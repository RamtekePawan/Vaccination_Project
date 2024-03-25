const User = require('../models/userModel');
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_PARSER_SECRET, { expiresIn: "1day" })
}

module.exports = {

  logOut: async (req, res) => {
    // Clear the token cookie to logout the user
    res.clearCookie("token", { path: "/" });

    // Redirect or send a response as needed
    module.exports.getLogInPage(req, res);
  },


  userLogin: async (req, res) => {
    const { email, password } = req.body;
    console.log("userLogin req.body:: ", req.body);
    console.log('userLogin:::', email, password);

    // Check if the user with the provided email exists
    let user = await User.getUserByEmail(email)
    console.log("User:", user.rows[0]);

    if (user.rows.length === 0) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    user = user.rows[0];

    // Check if the password is correct
    if (password !== user.password) {
      return res.status(401).json({ status: false, message: 'Incorrect password' });
    }

    // Generate and send JWT token
    const token = generateToken(user);
    res.cookie("token", token, {
      path: "/",                               //root path
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), //1 Day
      sameSite: "none",
      secure: true,
    });
    // Sending response to client 
    return res.status(200).json({ first_name: user.first_name, middle_name: user.middle_name, last_name: user.last_name, address: user.address, city: user.city, state: user.state, zip : user.zip, email: user.email, status: true, url: 'user/dashboard', message: "Logged in successfully" });
  },


  getLogInPage: async (req, res) => {
    console.log('getLogInPage:::')
    if (req.method == 'GET') {
      return res.render('login.ejs')
    }
  },
  getRegisterPage: async (req, res) => {
    console.log('getRegisterPage:::')
    return res.render('registerPage.ejs')
  },

  // bloodGroup: bloodGroup,
  // vaccineId: vaccineId,
  // vaccineDate: vaccineDate,
  // city1: city1,
  // city2: city2
  addUser: async (req, res) => {
    let { firstName, middleName, lastName, email, dateOfBirth, password, address, city, state, zip, bloodGroup, vaccineId, vaccineDate, city1, city2 }
      = { ...req.body, ...req.params, ...req.query }

    console.log('addUser:::', firstName, middleName, lastName, email, password, address, city, state, zip, dateOfBirth, bloodGroup)
    email = email.trim();

    //check already exist or not
    let alreadyExist = await User.getUserByEmail(email);
    console.log("Already Exist :::", alreadyExist.rows);

    if (alreadyExist.rows.length > 0) {
      return res.status(403).json({ status: false, message: 'User already exists' });
    }

    if (password.length < 6) {
      return res.status(403).json({ status: false, message: "Minimum 6 characters needed for password." });
    }

    if (!bloodGroup) {
      return res.status(403).json({ status: false, message: "Please Select Blood Group" });
    }

    if (!vaccineId) {
      return res.status(403).json({ status: false, message: "Please Enter vaccine Details" });
    }

    if (!dateOfBirth) {
      return res.status(403).json({ status: false, message: 'Please Enter Date Of Birth' });
    }

    if (!address || !city || !state || !zip) {
      return res.status(403).json({ status: false, message: 'Please Enter Address Properly' });
    }

    let age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();

    address = `${address}, ${city} ${state}-${zip}`;

    console.log("Age is ", age);
    console.log("Address is ", address);
    let response = await User.addNewUser({ firstName, middleName, lastName, email, password, address,city, state, zip, age: Number(age), bloodGroup, vaccineId, vaccineDate, city1, city2 })
    console.log("response::", response.rows[0]);
    let user = response.rows[0];

    //passing response to client
    if (user) {
      const { first_name, middle_name, last_name, email, address, city, state, zip, age } = user;
      return res.status(201).json({ first_name, middle_name, last_name, address, city, state, zip, email,age, status: true, url: '/login', message: "Registered Successfully!!" });
    } else {
      return res.status(403).json({ status: false, message: "Invalid User !!!" });
    }
  }
}