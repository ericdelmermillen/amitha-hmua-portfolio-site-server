/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = (knex) => {
  return knex.schema.createTable('models', (table) => {
    table.increments('id').primary();
    table.string('model_name', 255).notNullable();
  });
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('models');
};
