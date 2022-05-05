const Model = require("./Model");

class SearchMatch extends Model {
  static get tableName() {
    return "searchMatches";
  }
  static get relationMappings() {
    const { Keyword, Attraction } = require("./index.js");
    return {
      keyword: {
        relation: Model.BelongsToOneRelation,
        modelClass: Keyword,
        join: {
          from: "searchMatches.keywordId",
          to: "keywords.id",
        },
      },
      attraction: {
        relation: Model.BelongsToOneRelation,
        modelClass: Attraction,
        join: {
          from: "searchMatches.attractionId",
          to: "attractions.id",
        },
      },
    };
  }
}

module.exports = SearchMatch;
