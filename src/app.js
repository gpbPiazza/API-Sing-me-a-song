require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./utils/loadRelationships');

const genresRouter = require('./routers/genresRouter');
const recommendationsRouter = require('./routers/recommendationsRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/genres', genresRouter);
app.use('/recommendations', recommendationsRouter);

module.exports = app;
