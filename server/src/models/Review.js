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
    const { Attraction, User, Vote } = require("./index.js");

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
      userVotes: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "reviews.id",
          through: {
            from: "votes.reviewId",
            to: "votes.userId",
          },
          to: "users.id",
        },
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "reviews.id",
          to: "votes.reviewId",
        },
      },
    };
  }
}

module.exports = Review;
