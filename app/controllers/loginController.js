 module.exports = {

  getLogInPage : async (req, res) => {
      if(req.method == 'GET'){
        res.render('login.ejs')
      }
  }

 }