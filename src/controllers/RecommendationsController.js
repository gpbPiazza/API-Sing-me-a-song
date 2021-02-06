/* eslint-disable class-methods-use-this */
const Recommendation = require('../models/Recommendation');
const InvalidArrayOfIdsError = require('../error/InvalidArrayOfIdsError');
const Genre = require('../models/Genre');
const GenresIdsNotFoundError = require('../error/GenresIdsNotFoundError');
const RecommendationsGenre = require('../models/RecommendationsGenre');
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
      await RecommendationsGenre.create({ recommendationId: id, genreId: element });
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

    if (recommendation.score < -5) {
      await RecommendationsGenre.destroy({ where: { recommendationId } });
      await recommendation.destroy();
    }
    await recommendation.save();
    return null;
  }

  calculateRecomendation(recomendations) {
    const numberChance = Math.random() * 100;
    const randomElement = (currentArray) => Math.floor(Math.random() * currentArray.length);

    const rawRandomRecommendation = recomendations[randomElement(recomendations)];

    const scoreBiggerThanTen = (element) => element.score > 10;
    const scoreLessThanTen = (element) => element.score < 10;

    const filterRecomendations = (functionFilter) => {
      const filteredRecommendations = recomendations.filter(functionFilter);
      const elementCalculated = filteredRecommendations[randomElement(filteredRecommendations)];
      if (!elementCalculated) return rawRandomRecommendation;
      return elementCalculated;
    };

    if (numberChance < 70) {
      return filterRecomendations(scoreBiggerThanTen);
    }
    if (numberChance < 100) {
      return filterRecomendations(scoreLessThanTen);
    }
    return rawRandomRecommendation;
  }

  async getRandomRecommendation() {
    const recomendations = await Recommendation.findAll();
    if (!recomendations) throw new RecommendationNotFoundError();

    const recomendation = this.calculateRecomendation(recomendations);

    const recomendationWithGenresIds = await Recommendation.findByPk(
      recomendation.id,
      { include: Genre },
    );

    return recomendationWithGenresIds;
  }
}

module.exports = new RecommendationsController();
