const Model = require("./Model");

class Location extends Model {
  static get tableName() {
    return "locations";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["city", "province", "country"],
      properties: {
        city: { type: "string", minLength: 1 },
        province: { type: "string", minLength: 1 },
        country: { type: "string", minLength: 1 },
        description: { type: "string" }
      },
    };
  }

  static get relationMappings() {
    const { Attraction } = require("./index.js");
    return {
      attractions: {
        relation: Model.HasManyRelation,
        modelClass: Attraction,
        join: {
          from: "locations.id",
          to: "attractions.locationId",
        },
      },
    };
  }
}

module.exports = Location;
