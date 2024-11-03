// src/services/filmService.js
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5001/api'; 

// Hämta filmer via din backend
export const fetchMovies = async (query) => {
  const response = await axios.get(`${BACKEND_URL}/search/movie?q=${query}`);
  return response.data.map(movie => ({
    id: movie.id,
    title: movie.title,
    rating: movie.vote_average,
    imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  })); // Returnera resultaten som en lista av filmer
};

// Existerande funktioner som t.ex. getFilms och addFilm
const filmService = {
  getFilms: () => axios.get(`${BACKEND_URL}/films`).then((res) => res.data),
  addFilm: (filmData) => axios.post(`${BACKEND_URL}/films`, filmData),
  fetchMovies, // Lägg till fetchMovies här
};

export default filmService;
