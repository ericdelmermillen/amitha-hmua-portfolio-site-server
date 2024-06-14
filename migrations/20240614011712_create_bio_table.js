/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = (knex) => {
  return knex.schema.createTable('bio', (table) => {
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
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('bio');
};
