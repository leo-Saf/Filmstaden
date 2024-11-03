const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Testa anslutningen
pool.connect((err) => {
    if (err) {
      console.error('Fel vid anslutning till databasen', err.stack);
    } else {
      console.log('Anslutning till databasen lyckades!');
    }
  });
  
  module.exports = pool;
  
