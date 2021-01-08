const joi = require('joi');

const createGenre = joi.object({
  name: joi.string().required(),
});

module.exports = {
  createGenre,
};
