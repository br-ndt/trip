/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable('searchMatches', (table) =>{
        table.bigIncrements('id')
        table.bigInteger('keywordId').index().unsigned().notNullable().references('keywords.id')
        table.bigInteger('attractionId').index().unsigned().notNullable().references('attractions.id')
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists('searchMatches')
}
