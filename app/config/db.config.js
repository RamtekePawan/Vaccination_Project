require("dotenv").config(); 
const pg = require("pg");
const config = {
  user: process.env.PG_USERNAME,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password:  process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

const poolConnection = new pg.Pool(config);
module.exports = { pool: poolConnection };