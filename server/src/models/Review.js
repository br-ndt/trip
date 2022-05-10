const Model = require("./Model");

class Review extends Model {
  static get tableName() {
    return "reviews";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "rating", "attractionId", "userId"],
      properties: {
        title: { type: "string" },
        rating: { type: ["string", "integer"] },
        content: { type: "string" },
        attractionId: { type: ["string", "integer"] },
        userId: { type: ["string", "integer"] },
      },
    };
  }

  static get relationMappings() {
    const { Attraction, User } = require("./index.js");

    return {
      attraction: {
        relation: Model.BelongsToOneRelation,
        modelClass: Attraction,
        join: {
          from: "reviews.attractionId",
          to: "attractions.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Review;
