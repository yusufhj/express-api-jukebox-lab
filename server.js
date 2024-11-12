require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');

// controllers
const jukeboxesController = require('./controllers/jukeboxes.js');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes go here
app.use('/tracks', jukeboxesController);

app.listen(3000, () => {
  console.log('The express app is ready!');
});