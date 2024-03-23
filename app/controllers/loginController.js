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
    let { firstName, middleName, lastName, email, dateOfBirth, password, address,  city, state, zip } = {...req.body, ...req.params, ...req.query} 
    console.log('addUser:::',firstName, middleName, lastName, email, password, address,  city, state, zip, dateOfBirth)

    let alreadyExist = await User.getUserByEmail(email);
    console.log("Already Exist :::", alreadyExist.rows);
    if(alreadyExist.rows.length > 0){
      return res.status(500).json({status:false, message: 'User already exists'});
    }
     
    if(!dateOfBirth){
      return res.status(500).json({status:false, message : 'Please Enter Date Of Birth'});
    }


    let age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    
    address = `${address} ${city} ${state}-${zip}`;
    
    console.log("Age is ",age);
    console.log("Address is ",address);
    let response = await User.addNewUser({firstName, middleName, lastName, email, password, address, age: Number(age) })
    console.log("response::", response.rows[0]);
    return res.status(200).json({ status:true, url:'/login' });
  }
 }