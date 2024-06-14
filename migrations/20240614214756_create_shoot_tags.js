/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('shoot_tags', (table) => {
    table.integer('shoot_id').unsigned().notNullable();
    table.integer('tag_id').unsigned().notNullable();
    table.primary(['shoot_id', 'tag_id']);
    table.foreign('shoot_id').references('id').inTable('shoots').onDelete('CASCADE');
    table.foreign('tag_id').references('id').inTable('tags').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('shoot_tags');
};
