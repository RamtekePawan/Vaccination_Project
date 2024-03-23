 const User = require('../models/userModel');
 
 
 module.exports = {

  getLogInPage : async (req, res) => {
    console.log('getLogInPage:::')
      if(req.method == 'GET'){
       return res.render('login.ejs')
      }
  },
  getRegisterPage : async (req, res) => {
    console.log('getRegisterPage:::')
    return res.render('registerPage.ejs')
  },

  addUser : async (req, res) => {
    let { firstName, middleName, lastName, email, password, address,  city, state, zip } = {...req.body, ...req.params, ...req.query}
    console.log('req ::', req)
    console.log('addUser:::',firstName, middleName, lastName, email, password, address,  city, state, zip)

    address = `${address} ${city} ${state}-${zip}`;
    console.log("Address is ",address);
    let response = await User.addUser({firstName, middleName, lastName, email, password, address })
    
  
  }
 }