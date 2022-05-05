const Model = require("./Model");

class Keyword extends Model {
  static get tableName() {
    return "keywords";
  }
  static get relationMappings() {
    const { Attraction, SearchMatch } = require("./index.js");
    return {
      attractions: {
        relation: Model.ManyToManyRelation,
        modelClass: Attraction,
        join: {
          from: "keywords.id",
          through: {
            from: "searchMatches.keywordId",
            to: "searchMatches.attractionId",
          },
          to: "attractions.id",
        },
      },
      searchMatches: {
        relation: Model.HasManyRelation,
        modelClass: SearchMatch,
        join: {
          from: "keywords.id",
          to: "searchMatches.keywordId",
        },
      },
    };
  }
}

module.exports = Keyword;
