const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');


// Hämta alla filmer
router.get('/', filmController.getAllFilms);

// Lägg till en ny film
router.post('/', filmController.addFilm);

// Hämta alla filmer för en viss användare
router.get('/user/:userId', filmController.getFilmsByUser);

// Lägg till favoritfilm för användare
router.post('/user/:userId/favorites', filmController.addUserFavorite); // Lägg till denna rad


// Ta bort en film
router.delete('/:id', filmController.deleteFilm);

module.exports = router;
