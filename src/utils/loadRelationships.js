const Genre = require('../models/Genre');
const RecommendationGenre = require('../models/RecommendationGenre');
const Recommendation = require('../models/Recommendation');

Recommendation.belongsToMany(Genre, { through: RecommendationGenre });
Genre.belongsToMany(Recommendation, { through: RecommendationGenre });
