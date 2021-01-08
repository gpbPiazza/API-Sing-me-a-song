/* eslint-disable class-methods-use-this */
const DuplicateDataError = require('../error/DuplicateDataError');
const Recommendation = require('../models/Recommendation');
const InvalidArrayOfIdsError = require('../error/InvalidArrayOfIdsError');
const Genre = require('../models/Genre');
const GenresIdsNotFoundError = require('../error/GenresIdsNotFoundError');
const RecommendationGenre = require('../models/RecommendationGenre');
const RecommendationNotFoundError = require('../error/RecommendationNotFoundError');

class RecommendationsController {
  async create(recomendationData) {
    const { name, genresIds, youtubeLink } = recomendationData;

    const findByName = await Recommendation.findOne({ where: { name } });
    if (findByName) throw new DuplicateDataError();

    if (genresIds.length === 0) throw new InvalidArrayOfIdsError();
    const arrayDontHaveIntegers = genresIds.some((element) => {
      if (typeof element !== 'number') return true;
      return false;
    });
    if (arrayDontHaveIntegers) throw new InvalidArrayOfIdsError();

    const findIdsByIds = await Genre.findAll({ where: { id: genresIds } });
    if (findIdsByIds.length !== genresIds.length) throw new GenresIdsNotFoundError();

    const recommendation = await Recommendation.create({ name, youtubeLink });

    await Promise.all(genresIds.map(async (element) => {
      RecommendationGenre.create({ recommendationsId: recommendation.id, genresId: element });
    }));

    return { ...recommendation.dataValues, genresIds };
  }

  async upVote(recommendationId) {
    const recommendation = await Recommendation.findByPk(recommendationId);
    console.log(findById)
    if (!recommendation) throw new RecommendationNotFoundError();

  }
}

module.exports = new RecommendationsController();
