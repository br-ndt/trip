/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("attractions", (table) => {
    table.bigInteger("locationId").notNullable().unsigned().index().references("locations.id");
  });
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  if(knex.schema.hasColumn("attractions", "locationId")) {
    return knex.schema.table("attractions", (table) => {
      table.dropColumn("locationId");
    })
  }
}
