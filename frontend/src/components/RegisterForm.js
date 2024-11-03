import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users/register', {
        username,
        email,
        password,
      });
      // Hantera framgångsrik registrering
      setMessage(response.data.message); // Spara bekräftelsemeddelandet
      setError(''); // Nollställ eventuella felmeddelanden
      // Här kan du också navigera till inloggningssidan eller liknande
    } catch (err) {
      console.error(err);
      setError('Ett fel inträffade vid registreringen. Försök igen.'); // Hantera eventuella fel
      setMessage(''); // Nollställ bekräftelsemeddelandet
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registrera dig</h2>
      <input
        type="text"
        placeholder="Användarnamn"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
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
      />
      <button type="submit">Registrera</button>
      {message && <p style={{ color: 'green' }}>{message}</p>} {/* Visa bekräftelsemeddelandet */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Visa felmeddelandet */}
    </form>
  );
};

export default RegisterForm;
