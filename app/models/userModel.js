const { pool } = require('../config/db.config');

module.exports = class User {

  static tbl_users = 'users';

  static getUserByEmail(email) {
    const statement = {
      text: `SELECT * FROM users WHERE email = $1 AND enabled = '1';`,
      values: [email],
    }
    console.log('statement getUserByEmail::', statement)
    return pool.query(statement)
  }

  static addNewUser({ firstName, middleName, lastName, email, password, address, age , bloodGroup, vaccineId, vaccineDate, city1, city2 }) {
    const statement = {
      text: `INSERT INTO users (first_name, middle_name, last_name, email, password, address, age ,blood_group, vaccination_certificate_id, vaccination_certificate_date, first_vaccination_city, second_vaccination_city,  enabled) 
            VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9, $10, $11, $12, $13) RETURNING *;`,
      values: [ firstName, middleName, lastName, email, password, address, age, bloodGroup, vaccineId, vaccineDate, city1, city2, 1 ],
    }
    console.log('statement addNewUser::', statement)
    return pool.query(statement)
  }


}