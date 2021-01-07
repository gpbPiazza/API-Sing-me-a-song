require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routersGenres = require('./routers/routersGenres');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/genres', routersGenres);

module.exports = app;
