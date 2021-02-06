const Genre = require('../models/Genre');
const RecommendationsGenre = require('../models/RecommendationsGenre');
const Recommendation = require('../models/Recommendation');

Recommendation.belongsToMany(Genre, { through: RecommendationsGenre });
Genre.belongsToMany(Recommendation, { through: RecommendationsGenre });
