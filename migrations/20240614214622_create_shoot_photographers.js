/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('shoot_photographers', (table) => {
    table.integer('shoot_id').unsigned().notNullable();
    table.integer('photographer_id').unsigned().notNullable();
    table.primary(['shoot_id', 'photographer_id']);
    table.foreign('shoot_id').references('id').inTable('shoots').onDelete('CASCADE');
    table.foreign('photographer_id').references('id').inTable('photographers').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('shoot_photographers');
};