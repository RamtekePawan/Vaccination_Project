const User = require('../models/userModel');

module.exports = {

    getDashboard: async (req, res) => {
        //let { user } = { ...req.body, ...req.query, ...req.params };
        console.log("req.body::getDashboard: >>", req.user);

        //console.log('getDashboard:::', user)
        if (req.method == 'GET') {
            let { email, first_name, middle_name, last_name, address, city, state, zip, age, blood_group, vaccination_certificate_id, vaccination_certificate_date, first_vaccination_city, second_vaccination_city } = { ...req.user }
            let loginUser = { email, first_name, middle_name, last_name, address, city, state, zip, age, blood_group, vaccination_certificate_id, vaccination_certificate_date, first_vaccination_city, second_vaccination_city }
            console.log("LoginUser ::: getDashboard:::>", loginUser);
            return res.render('dashboard.ejs', { user: loginUser })
        }
    },


    updateDetails: async (req, res) => {
        console.log("req.body::updateDetails: >>", req.user, req.body);
        let { id } = { ...req.user }

        console.log("req.body::updateDashboard", req.body, id);

        let { email, firstName, middleName, lastName, password, address, city, state, zip, bloodGroup, vaccineId, vaccineDate, city1, city2 } = { ...req.body }
        password = req.body.password == "" || req.user.password == null ? req.user.password : req.body.password;
        vaccineDate = new Date(vaccineDate);
        try {
            let result = await User.updateUser(id, email, firstName, middleName, lastName, password, address, city, state, zip, bloodGroup, vaccineId, req.user.vaccination_certificate_date, city1, city2);

            console.log("Update Details controller result", result.rows[0])
            return res.json({ result: result.rows[0], status: true });
        } catch (error) {
            return res.json({ result: result.rows[0], status: false });   
        }
    }

}