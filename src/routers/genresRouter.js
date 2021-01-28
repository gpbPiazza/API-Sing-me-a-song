/* eslint-disable no-console */
const router = require('express').Router();
const genresSchemas = require('../schemas/genresSchemas');
const GenresController = require('../controllers/GenresController');
const DuplicateDataError = require('../error/DuplicateDataError');

router.post('/', async (req, res) => {
  const { name } = req.body;

  const { error } = genresSchemas.createGenre.validate(req.body);
  if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const genre = await GenresController.create(name);
    return res.status(201).send(genre);
  } catch (exception) {
    console.error(exception);
    if (exception instanceof DuplicateDataError) {
      return res.status(409).send({ error: 'This genre name its alredy created' });
    }
    return res.status(500).send({ error: 'call the responsible person, Post, endPoint:/genres' });
  }
});

router.get('/', async (req, res) => {
  try {
    const genres = await GenresController.getAll();
    return res.status(200).send(genres);
  } catch (exception) {
    console.error(exception);
    return res.status(500).send({ error: 'call the responsible person, Get, endPoint:/genres' });
  }
});

module.exports = router;
