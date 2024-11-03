import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import FilmForm from './components/FilmForm';
import FilmList from './components/FilmList';
import FavoriteList from './components/FavoriteList'; // Importera FavoriteList
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [films, setFilms] = useState([]);
  const [favorites, setFavorites] = useState([]); // Hålla favoriter i state
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    localStorage.setItem('token', userData.token);
    setUser(userData.user); // Här sätter vi användardata som innehåller id
    console.log("Inloggad användare:", userData.user); // Logga användardata
    setMessage('Inloggning lyckades!');
    navigate('/'); // Navigera till startsidan
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setFavorites([]); // Nollställ favoriter vid utloggning
    setMessage('Du har loggat ut!');
  };

  const fetchFilms = async () => {
    try {
      // Byt ut URL:en nedan mot din API-URL för att hämta filmer
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=8034d73f1fb759ae30b1bc1d6594bda5'); // Ersätt 'YOUR_API_KEY' med din riktiga API-nyckel
      if (!response.ok) {
        throw new Error('Något gick fel vid hämtning av filmer');
      }
      const data = await response.json();
      
      // Anpassa denna del för att matcha din data-struktur
      const fetchedFilms = data.results.map(film => ({
        id: film.id,
        title: film.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${film.poster_path}`, // Hämta bilden med hjälp av TMDb's bild-URL
        rating: film.vote_average // Använd filmens betyg
      }));
  
      setFilms(fetchedFilms);
    } catch (error) {
      console.error("Fel vid hämtning av filmer:", error);
    }
  };

  
  

  useEffect(() => {
    if (user) {
      fetchFilms(); // Hämta filmer när användaren loggar in
    }
  }, [user]);

  useEffect(() => {
    console.log("Aktuell användare:", user); // Logga användare vid förändringar
  }, [user]);

  const addFavorite = (film) => {
    console.log("Lägger till film till favoriter:", film); // Logga filmen
    setFavorites((prevFavorites) => [...prevFavorites, film]);
    setMessage(`${film.title} har lagts till i favoriter!`);
  };

  return (
    <div className="App">
      <h1>Filmprojekt</h1>
      {message && <p>{message}</p>}
      <Routes>
        <Route path="/" element={!user ? (
          <>
            <RegisterForm />
            <LoginForm onLogin={handleLogin} />
          </>
        ) : (
          <div>
            <FilmForm />
            <FilmList films={films} user={user} addFavorite={addFavorite} />
            <FavoriteList favorites={favorites} /> {/* Visa favoriter */}
            <button onClick={handleLogout}>Logga ut</button>
          </div>
        )} />
      </Routes>
    </div>
  );
}

export default App;
