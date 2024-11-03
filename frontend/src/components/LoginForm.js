import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importera useNavigate för navigering

const LoginForm = ({ onLogin }) => { // Lägg till onLogin som prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Använd useNavigate för navigering

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Försöker logga in med:', email, password); // Logga inmatningen för felsökning

    try {
      const response = await axios.post('http://localhost:5001/api/users/login', {
        email,
        password,
      });
      console.log('Inloggningsrespons:', response.data); // Logga serverns respons

      if (response.data.token) {
        // Hantera framgångsrik inloggning
        setMessage('Inloggning lyckades! Välkommen!'); // Spara bekräftelsemeddelandet
        setError(''); // Nollställ eventuella felmeddelanden
        localStorage.setItem('token', response.data.token); // Spara token i localStorage

        // Anropa onLogin för att skicka användardata tillbaka till App
        onLogin({ token: response.data.token, user: response.data.user }); // Skicka användardata

        // Navigera till en annan sida, t.ex. till dashboard eller startsidan
        navigate('/'); // Navigera till startsidan (eller annan sida)
      } else {
        setError('Inloggning misslyckades.'); // Om inget token returneras
        setMessage('');
      }
    } catch (err) {
      console.error('Inloggningsfel:', err); // Logga eventuella fel
      setError('Fel användarnamn eller lösenord. Försök igen.'); // Hantera eventuella fel
      setMessage(''); // Nollställ bekräftelsemeddelandet
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Logga in</h2>
      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password" // Lägg till autocomplete-attribut för bättre användarupplevelse
      />
      <button type="submit">Logga in</button>
      {message && <p style={{ color: 'green' }}>{message}</p>} {/* Visa bekräftelsemeddelandet */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Visa felmeddelandet */}
    </form>
  );
};

export default LoginForm;
