const joi = require('joi');

const createGenres = joi.object({
  name: joi.string().required(),
});

module.exports = {
  createGenres,
};
