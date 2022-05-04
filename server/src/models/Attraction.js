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
      },
    };
  }

  static get relationMappings() {
    const { Location } = require("./index.js");
    return {
      location: {
        relation: Model.BelongsToOneRelation,
        modelClass: Location,
        join: {
          from: "attractions.locationId",
          to: "locations.id"
        }
      }
    }
  }
}

module.exports = Attraction;
