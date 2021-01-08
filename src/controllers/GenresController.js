/* eslint-disable class-methods-use-this */
const DuplicateDataError = require('../error/DuplicateDataError');
const Genre = require('../models/Genre');

class GenresController {
  async create(name) {
    const findByName = await Genre.findOne({ where: { name } });
    if (findByName) throw new DuplicateDataError();

    const genre = await Genre.create({ name });
    return genre;
  }

  getAll() {
    return Genre.findAll({
      order: [
        ['name', 'ASC'],
      ],
    });
  }
}

module.exports = new GenresController();
