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
}

module.exports = Attraction;
