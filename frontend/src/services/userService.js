// userService.js
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5001/api';

// Hämta användarens favoriter
export const getUserFavorites = async (userId) => {
  const response = await axios.get(`${BACKEND_URL}/users/${userId}/favorites`);
  return response.data; // Returnera användarens favoriter
};

// Spara en film till användarens favoriter
export const addUserFavorite = async (userId, film) => {
  const response = await axios.post(`${BACKEND_URL}/users/${userId}/favorites`, film);
  return response.data; // Returnera den sparade filmen
};

// Ta bort en film från användarens favoriter
export const removeUserFavorite = async (userId, filmId) => {
  await axios.delete(`${BACKEND_URL}/users/${userId}/favorites/${filmId}`);
};
