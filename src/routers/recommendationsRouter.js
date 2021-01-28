/* eslint-disable no-console */
const router = require('express').Router();
const recommendationsSchemas = require('../schemas/recommendationsSchemas');
const RecomendationsController = require('../controllers/RecommendationsController');
const InvalidArrayOfIdsError = require('../error/InvalidArrayOfIdsError');
const GenresIdsNotFoundError = require('../error/GenresIdsNotFoundError');
const RecommendationNotFoundError = require('../error/RecommendationNotFoundError');

router.post('/', async (req, res) => {
  const { error } = recommendationsSchemas.createRecommendation.validate(req.body);
  if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const { name, genresIds, youtubeLink } = req.body;
    const recommendationData = { name, genresIds, youtubeLink };

    const recomendation = await RecomendationsController.create(recommendationData);
    return res.status(201).send(recomendation);
  } catch (exception) {
    console.error(exception);
    if (exception instanceof InvalidArrayOfIdsError) {
      return res.status(404).send({ error: 'genresIds array should only contain integers' });
    } if (exception instanceof GenresIdsNotFoundError) {
      return res.status(404).send({ error: 'Ids not found' });
    }
    return res.status(500).send({ error: 'call the responsible person, endPoint:/recomendations ' });
  }
});

router.post('/:id/upvote', async (req, res) => {
  if (!req.params.id) return res.status(422).send({ error: 'Must contain recommendationId params' });

  try {
    const recommendationId = parseInt(req.params.id, 10);
    await RecomendationsController.upVote(recommendationId);

    return res.sendStatus(200);
  } catch (exception) {
    console.error(exception);
    if (exception instanceof RecommendationNotFoundError) {
      return res.status(404).send({ error: 'recommendation not found' });
    }
    return res.status(500).send({ error: 'call the responsible person, endPoint:/recomendations/:id/upvote' });
  }
});

router.post('/:id/downvote', async (req, res) => {
  if (!req.params.id) return res.status(422).send({ error: 'Must contain recommendationId params' });

  try {
    const recommendationId = parseInt(req.params.id, 10);
    await RecomendationsController.downvote(recommendationId);

    return res.sendStatus(200);
  } catch (exception) {
    console.error(exception);
    if (exception instanceof RecommendationNotFoundError) {
      return res.status(404).send({ error: 'recommendation not found' });
    }
    return res.status(500).send({ error: 'call the responsible person,  endPoint:/recomendations/:id/downvote' });
  }
});

router.get('/random', async (req, res) => {
  try {
    const recomendation = await RecomendationsController.getRandomRecommendation();

    return res.status(200).send(recomendation);
  } catch (exception) {
    console.error(exception);
    if (exception instanceof RecommendationNotFoundError) {
      return res.status(404).send({ error: 'recommendations not found' });
    }
    return res.status(500).send({ error: 'call the responsible person, endPoint:/recomendations/random' });
  }
});

module.exports = router;
