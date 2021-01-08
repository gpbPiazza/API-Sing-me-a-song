/* eslint-disable class-methods-use-this */
const Recommendation = require('../models/Recommendation');
const InvalidArrayOfIdsError = require('../error/InvalidArrayOfIdsError');
const Genre = require('../models/Genre');
const GenresIdsNotFoundError = require('../error/GenresIdsNotFoundError');
const RecommendationGenre = require('../models/RecommendationGenre');
const RecommendationNotFoundError = require('../error/RecommendationNotFoundError');

class RecommendationsController {
  async create(recomendationData) {
    const { name, genresIds, youtubeLink } = recomendationData;

    if (genresIds.length === 0) throw new InvalidArrayOfIdsError();
    const arrayDontHaveIntegers = genresIds.some((element) => {
      if (typeof element !== 'number') return true;
      return false;
    });
    if (arrayDontHaveIntegers) throw new InvalidArrayOfIdsError();

    const findIdsByIds = await Genre.findAll({ where: { id: genresIds } });
    if (findIdsByIds.length !== genresIds.length) throw new GenresIdsNotFoundError();

    const recommendation = await Recommendation.create({ name, youtubeLink });
    const { id } = recommendation.dataValues;

    await Promise.all(genresIds.map(async (element) => {
      await RecommendationGenre.create({ recommendationId: id, genreId: element });
    }));

    return { ...recommendation.dataValues, genresIds };
  }

  async upVote(recommendationId) {
    const recommendation = await Recommendation.findByPk(recommendationId);
    if (!recommendation) throw new RecommendationNotFoundError();

    recommendation.score += 1;

    await recommendation.save();
    return null;
  }

  async downvote(recommendationId) {
    const recommendation = await Recommendation.findByPk(recommendationId);
    if (!recommendation) throw new RecommendationNotFoundError();

    recommendation.score -= 1;

    if (recommendation.score !== -5) {
      return recommendation.save();
    }
    await RecommendationGenre.destroy({ where: { recommendationId } });
    await recommendation.destroy();
    return null;
  }
}

module.exports = new RecommendationsController();
