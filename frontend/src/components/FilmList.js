import React, { useState } from 'react';
import FilmCard from './FilmCard';
import { addUserFavorite } from '../services/userService'; // Importera din service

const FilmList = ({ films = [], user, addFavorite }) => {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [rating, setRating] = useState(1);

  const handleAddToFavorites = async (film) => {
    console.log("Användare vid lägg till favoriter:", user); // Logga user
    if (!user || !user.id) {
      console.error("User is not defined or does not have an ID.");
      return; // Avbryt om user inte är definierad
    }

    try {
      // Försök att lägga till filmen till favoriter
      await addUserFavorite(user.id, { ...film, rating });
      addFavorite({ ...film, rating }); // Lägg till filmen till favoriter i state
      setSelectedFilm(null); // Stäng modal
      setRating(1); // Återställ betyg
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <div className="film-list">
      {films.length > 0 ? (
        films.map((film) => (
          <FilmCard
            key={film.id}
            title={film.title}
            rating={film.rating}
            imageUrl={film.imageUrl} // Skicka imageUrl
            onAddToFavorites={() => {
              setSelectedFilm(film); // Öppna modal
            }}
          />
        ))
      ) : (
        <p>Inga filmer tillgängliga.</p>
      )}
      {selectedFilm && (
        <div className="modal">
          <h2>Lägg till {selectedFilm.title} till favoriter</h2>
          <label>
            Betyg:
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>
          <button onClick={() => handleAddToFavorites(selectedFilm)}>Lägg till till favoriter</button>
          <button onClick={() => setSelectedFilm(null)}>Stäng</button>
        </div>
      )}
    </div>
  );
};

export default FilmList;
