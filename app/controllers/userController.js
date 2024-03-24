const User = require('../models/userModel');

module.exports = {

    getDashboard: async (req, res) => {
        //let { user } = { ...req.body, ...req.query, ...req.params };
        console.log("req.body::getDashboard: >>", req.user);
        
        //console.log('getDashboard:::', user)
        if (req.method == 'GET') {
            let { email, first_name, middle_name, last_name,address, age, blood_group, vaccination_certificate_id, vaccination_certificate_date, first_vaccination_city, second_vaccination_city } = { ...req.user }
            let loginUser = { email, first_name, middle_name, last_name, address, age, blood_group, vaccination_certificate_id, vaccination_certificate_date, first_vaccination_city, second_vaccination_city }
            console.log("LoginUser ::: getDashboard:::>", loginUser);
            return res.render('dashboard.ejs', { user: loginUser })
        }
    }
}