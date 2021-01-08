/* eslint-disable class-methods-use-this */
const DuplicateDataError = require('../error/DuplicateDataError');
const Recommendation = require('../models/Recommendation');
const InvalidArrayOfIdsError = require('../error/InvalidArrayOfIdsError');
const Genre = require('../models/Genre');
const GenresIdsNotFoundError = require('../error/GenresIdsNotFoundError');
const RecommendationGenre = require('../models/RecommendationGenre');

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

    const zape = await Promise.all(genresIds.map(async (element) => {
      await RecommendationGenre.create({ recommendationsId: recommendation.id, genresId: element });
    }));

    console.log(zape, 'aaaaaaaaaaaaa');

    return { ...recommendation.dataValues, genresIds };
  }
}

module.exports = new RecommendationsController();
