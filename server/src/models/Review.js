const Model = require("./Model");

class Review extends Model {
  static get tableName() {
    return "reviews";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "rating", "attractionId"],
      properties: {
        title: { type: "string" },
        rating: { type: ["integer", "string"], minimum: 1, maximum: 5 },
        content: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Attraction } = require("./index.js");

    return {
      attraction: {
        relation: Model.BelongsToOneRelation,
        modelClass: Attraction,
        join: {
          from: "reviews.attractionId",
          to: "attractions.id",
        },
      },
    };
  }
}

module.exports = Review;
