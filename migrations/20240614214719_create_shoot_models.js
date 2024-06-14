/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('shoot_models', (table) => {
    table.integer('shoot_id').unsigned().notNullable();
    table.integer('model_id').unsigned().notNullable();
    table.primary(['shoot_id', 'model_id']);
    table.foreign('shoot_id').references('id').inTable('shoots').onDelete('CASCADE');
    table.foreign('model_id').references('id').inTable('models').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('shoot_models');
};
