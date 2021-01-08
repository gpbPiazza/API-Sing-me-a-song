/* eslint-disable no-console */
const router = require('express').Router();
const recommendationsSchemas = require('../schemas/recommendationsSchemas');
const RecomendationsController = require('../controllers/RecommendationsController');
const DuplicateDataError = require('../error/DuplicateDataError');
const InvalidArrayOfIdsError = require('../error/InvalidArrayOfIdsError');
const GenresIdsNotFoundError = require('../error/GenresIdsNotFoundError');

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
    if (exception instanceof DuplicateDataError) {
      return res.status(409).send({ error: 'This recommendation name its alredy created' });
    } if (exception instanceof InvalidArrayOfIdsError) {
      return res.status(404).send({ error: 'genresIds array should only contain integers' });
    } if (exception instanceof GenresIdsNotFoundError) {
      return res.status(404).send({ error: 'Ids not found' });
    }
    return res.status(500).send({ error: 'call the responsible person' });
  }
});

router.post('/:id/upvote', async (req, res) => {
  if (!req.params.id) return res.status(422).send({ error: "Must contain recommendationId params" });

  try {
    const recommendationId = parseInt(req.params.id);
    const recomendation = await RecomendationsController.upVote(recommendationId);

    return res.status(200).send(recomendation);
  } catch (exception) {
    console.error(exception);
   
    return res.status(500).send({ error: 'call the responsible person' });
  }
});

module.exports = router;
