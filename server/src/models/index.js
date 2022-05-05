// include all of your models here using CommonJS requires
const User = require("./User.js");
const Attraction = require("./Attraction.js");
const Review = require("./Review.js");
const Keyword = require('./Keyword.js')
const SearchMatch = require('./SearchMatch.js')
module.exports = { Review, Attraction, User,Keyword,SearchMatch };
