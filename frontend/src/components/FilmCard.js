import React from 'react';
import '../App.css';

const FilmCard = ({ title, rating, imageUrl, onAddToFavorites }) => {
  return (
    <div className="film-card">
      <img src={imageUrl} alt={title} className="film-image" />
      <h3 className="film-title">{title}</h3>
      <p className="film-rating">Rating: {rating} ⭐</p>
      <button className="favorite-btn" onClick={onAddToFavorites}>
        Lägg till favoriter
      </button>
    </div>
  );
};

export default FilmCard;
