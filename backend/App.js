// app.js

const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const filmRoutes = require('./routes/filmRoutes');
require('dotenv').config();
const pool = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
app.use(cors());
app.use(express.json());



// Använd routes
app.use('/api/users', userRoutes);
app.use('/api/films', filmRoutes);
// Använd movieRoutes
app.use('/api', movieRoutes);

app.use(express.json()); // För att kunna ta emot JSON-data
app.use('/api/users', userRoutes); // Sätta upp routes


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
