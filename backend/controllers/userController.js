const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Anta att du har konfigurerat din databasanslutning

// Registrera en ny användare
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Kontrollera om e-postadressen redan finns
    const emailCheck = await pool.query('SELECT * FROM "FilmProjekt".users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: 'E-postadressen används redan.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hasha lösenordet
    const result = await pool.query(
      'INSERT INTO "FilmProjekt".users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    const newUser = result.rows[0];
    res.status(201).json({
      message: `Registreringen lyckades! Välkommen, ${newUser.username}!`,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Ett fel inträffade vid registreringen.' });
  }
};

// Logga in en användare
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM "FilmProjekt".users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Fel användarnamn eller lösenord.' });
    }

    // Använd en miljövariabel för hemligheten
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ett fel inträffade vid inloggningen.' });
  }
};

// Hämta användarinformation
const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query('SELECT id, username, email FROM "FilmProjekt".users WHERE id = $1', [userId]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'Användaren hittades inte.' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ett fel inträffade.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
