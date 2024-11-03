const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = '8034d73f1fb759ae30b1bc1d6594bda5';
const BASE_URL = 'https://api.themoviedb.org/3';

// Route för att söka filmer
router.get('/search/movie', async (req, res) => {
  const query = req.query.q; // Få sökfrågan från query-parametrar
  try {
    const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
