/* eslint-disable no-console */
const router = require('express').Router();
const genresSchemas = require('../schemas/genresSchemas');
const GenresController = require('../controllers/genresController');
const DuplicateGenre = require('../error/DuplicateGenre');

router.post('/', async (req, res) => {
  const { name } = req.body;

  const { error } = genresSchemas.createGenres.validate(req.body);
  if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const genres = await GenresController.create(name);
    return res.status(201).send(genres);
  } catch (exception) {
    console.error(exception);
    if (exception instanceof DuplicateGenre) {
      return res.status(409).send({ error: 'This genre name its alredy created' });
    }
    return res.status(500).send({ error: 'call the responsible person' });
  }
});

module.exports = router;
