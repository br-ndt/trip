const Model = require("./Model");

class Attraction extends Model {
  static get tableName() {
    return "attractions";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", minLength: 1 },
        description: { type: "string" },
        image: { type: "string" },
        locationId: { type: ["string", "integer"] },
      },
    };
  }

  static get relationMappings() {
    const { Review } = require("./index.js");
    const { Location } = require("./index.js");

    return {
      location: {
        relation: Model.BelongsToOneRelation,
        modelClass: Location,
        join: {
          from: "attractions.locationId",
          to: "locations.id",
        },
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "attractions.id",
          to: "reviews.attractionId",
        },
      },
    };
  }
}

module.exports = Attraction;
