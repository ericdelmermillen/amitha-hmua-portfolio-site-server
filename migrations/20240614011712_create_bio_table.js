/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = function(knex) {
  return knex.schema.createTable('bio', function(table) {
    table.increments('id').primary();
    table.string('bio_name', 100);
    table.string('bio_img_url', 255).notNullable();
    table.string('bio_text', 2000).notNullable();
  });
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('bio');
};
