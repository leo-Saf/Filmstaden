const pool = require('../config/db');

// Lägg till en ny film
const addFilm = async (title, rating, userId) => {
    console.log('Title:', title, 'Rating:', rating, 'User ID:', userId); // Lägg till denna rad
    try {
      const result = await pool.query(
        'INSERT INTO "FilmProjekt".films (title, rating, user_id) VALUES ($1, $2, $3) RETURNING *',
        [title, rating, userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Fel vid läggning av film:', error);
      throw error;
    }
  };
  

// Hämta alla filmer
const getAllFilms = async () => {
  try {
    const result = await pool.query('SELECT * FROM "FilmProjekt".films');
    return result.rows;
  } catch (error) {
    console.error('Fel vid hämtning av alla filmer:', error);
    throw error;
  }
};

// Hämta alla filmer för en viss användare
const getFilmsByUser = async (userId) => {
  try {
    const result = await pool.query(
      'SELECT * FROM "FilmProjekt".films WHERE user_id = $1',
      [userId]
    );
    return result.rows;
  } catch (error) {
    console.error('Fel vid hämtning av filmer för användare:', error);
    throw error;
  }
};

// Ta bort en film
const deleteFilm = async (id) => {
  try {
    const result = await pool.query(
      'DELETE FROM "FilmProjekt".films WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Fel vid borttagning av film:', error);
    throw error;
  }
};

const addUserFavorite = async (userId, film) => {
    // Här kan du justera hur du vill spara filmen i databasen.
    // Anta att du har en favoritlista i din databas för varje användare.

    const { title, rating, imageUrl } = film; // Extrahera filmdata

    const result = await pool.query(
        'INSERT INTO "FilmProjekt".favorites (user_id, title, rating, imageUrl) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, title, rating, imageUrl]
    );

    return result.rows[0]; // Returnera den nyss sparade favoritfilmen
};

module.exports = { addFilm, getAllFilms, getFilmsByUser, deleteFilm, addUserFavorite };
