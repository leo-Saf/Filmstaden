const filmService = require('../services/filmService');

// Lägg till en ny film
const addFilm = async (req, res) => {
  const { title, rating, user_id } = req.body;
  console.log('User ID:', user_id); // Lägg till denna rad
  try {
    const newFilm = await filmService.addFilm(title, rating, user_id);
    res.status(201).json(newFilm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Hämta alla filmer
const getAllFilms = async (req, res) => {
  try {
    const films = await filmService.getAllFilms();
    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hämta alla filmer för en viss användare
const getFilmsByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const films = await filmService.getFilmsByUser(userId);
    res.status(200).json(films);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Ta bort en film
const deleteFilm = async (req, res) => {
  const filmId = req.params.id;
  try {
    await filmService.deleteFilm(filmId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lägg till favoritfilm
const addUserFavorite = async (req, res) => {
  const userId = req.params.userId;
  const { id, title, imageUrl, rating } = req.body;

  try {
    // Kontrollera om filmen redan är en favorit för användaren
    const checkFavorite = await filmService.getUserFavorite(userId, id);
    if (checkFavorite) {
      return res.status(400).json({ error: 'Filmen finns redan i favoriter.' });
    }

    const newFavorite = await filmService.addUserFavorite(userId, { id, title, imageUrl, rating });
    res.status(201).json(newFavorite);
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ error: 'Ett fel inträffade vid lägg till favoritfilm.' });
  }
};

module.exports = {
  addFilm,
  getAllFilms,
  getFilmsByUser,
  deleteFilm,
  addUserFavorite
};
