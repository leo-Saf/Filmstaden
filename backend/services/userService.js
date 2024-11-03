// services/userService.js

const pool = require('../config/db');

// Registrera ny användare
const registerUser = async (username, email, password) => {
  const result = await pool.query(
    'INSERT INTO FilmProjekt.users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, password]
  );
  return result.rows[0];
};

// Logga in användare
const loginUser = async (email) => {
  const result = await pool.query(
    'SELECT * FROM FilmProjekt.users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

// Hämta användarinformation
const getUser = async (id) => {
  const result = await pool.query(
    'SELECT * FROM FilmProjekt.users WHERE id = $1',
    [id]
  );
  return result.rows[0];
};


module.exports = { registerUser, loginUser, getUser };
