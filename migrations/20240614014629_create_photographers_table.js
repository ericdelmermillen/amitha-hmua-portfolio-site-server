/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = (knex) => {
  return knex.schema.createTable('photographers', (table) => {
    table.increments('id').primary();
    table.string('photographer_name', 255).notNullable();
  });
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('photographers');
};
