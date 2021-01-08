const joi = require('joi');

const createRecommendation = joi.object({
  name: joi.string().required(),
  genresIds: joi.array().required(),
  youtubeLink: joi.string().uri().pattern(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/).required(),
});

module.exports = {
  createRecommendation,
};
