import React from 'react';

const FavoriteList = ({ favorites }) => {
  console.log("Favoriter:", favorites); // Lägg till loggning här
  if (favorites.length === 0) {
    return <p>Inga favoriter lagrade.</p>;
  }

  return (
    <div>
      <h2>Favoritfilmer</h2>
      <ul>
        {favorites.map((film) => (
          <li key={film.id}>
            <h3>{film.title}</h3>
            <img src={film.imageUrl} alt={film.title} />
            <p>Betyg: {film.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;
