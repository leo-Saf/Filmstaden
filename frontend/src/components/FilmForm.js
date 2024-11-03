import React, { useState } from 'react';
import { fetchMovies } from '../services/filmService';
import FilmList from './FilmList';

const FilmForm = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async () => {
    const results = await fetchMovies(query);
    setMovies(results);
  };

  const addFavorite = (film) => {
    setFavorites([...favorites, film]);
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(favorite => favorite.id !== id));
  };

  return (
    <div>
      <h2>Sök efter filmer</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Sök efter filmer..."
      />
      <button onClick={handleSearch}>Sök</button>

      {/* Använd FilmList för att rendera filmerna */}
      <FilmList films={movies} addFavorite={addFavorite} />
      
      {/* Visa favoriter */}
      <h2>Favoriter</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <img src={favorite.imageUrl} alt={favorite.title} className="film-image" />
            {favorite.title} - Betyg: {favorite.rating} ⭐
            <button onClick={() => removeFavorite(favorite.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmForm;
