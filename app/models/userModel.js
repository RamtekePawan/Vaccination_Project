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

  static addNewUser({ firstName, middleName, lastName, email, password, address, city, state, zip, age, bloodGroup, vaccineId, vaccineDate, city1, city2 }) {
    const statement = {
      text: `INSERT INTO users (first_name, middle_name, last_name, email, password, address, city, state, zip, age ,blood_group, vaccination_certificate_id, vaccination_certificate_date, first_vaccination_city, second_vaccination_city,  enabled) 
            VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *;`,
      values: [firstName, middleName, lastName, email, password, address, city, state, zip, age, bloodGroup, vaccineId, vaccineDate, city1, city2, 1],
    }
    console.log('statement addNewUser::', statement)
    return pool.query(statement)
  }


  static updateUser(id, email, firstName, middleName, lastName, password, address, city, state, zip, bloodGroup, vaccineId, vaccineDate, city1, city2) {
    const statement = {
      text: `UPDATE users
                      SET
                        first_name = $1,
                        middle_name = $2,
                        last_name = $3,
                        password = $4,
                        address = $5,
                        city = $6,
                        state = $7,
                        zip = $8,
                        blood_group = $9,
                        vaccination_certificate_id = $10,
                        vaccination_certificate_date = $11,
                        first_vaccination_city = $12,
                        second_vaccination_city = $13
                      WHERE
                          email = $14
                          and id = $15
                      RETURNING *;`,

      values: [firstName, middleName, lastName, password, address, city, state, zip, bloodGroup, vaccineId, vaccineDate, city1, city2, email, id]
    }
    console.log('statement addNewUser::', statement)
    return pool.query(statement)
  }

}