/* eslint-disable class-methods-use-this */
const DuplicateGenre = require('../error/DuplicateGenre');
const Genres = require('../models/Genres');

class GenresController {
  async create(name) {
    const findByName = await Genres.findOne({ where: { name } });
    if (findByName) throw new DuplicateGenre();

    const genre = await Genres.create({ name });
    return genre;
  }

  getAll() {
    return Genres.findAll({
      order: [
        ['name', 'ASC'],
      ],
    });
  }
}

module.exports = new GenresController();
