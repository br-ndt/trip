/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("votes", (table) => {
    table.bigIncrements("id")
    table.bigInteger("reviewId").unsigned().index().references("reviews.id").notNullable()
    table.bigInteger("userId").unsigned().index().references("users.id").notNullable()
    table.integer("score").notNullable()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("votes")
}
