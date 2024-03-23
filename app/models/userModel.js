const { pool } = require('../config/db.config');

module.exports = class User{

  static tbl_users = 'users';

  static getUserByEmail(email){
    const statment = {
      text: `SELECT * FROM users WHERE email = $1 AND enabled = '1';`,
      values: [email],
    }
  } 

  static addNewUser({firstName, middleName, lastName, email, password, address }){
    const statment = {
      text: `INSERT INTO users (first_name, middle_name, last_name, email, password, address) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
      
      values: [firstName, middleName, lastName, email, password, address ],
    }
  }

}