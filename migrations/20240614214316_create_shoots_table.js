/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('shoots', (table) => {
    table.increments('id').primary(); // INT AUTO_INCREMENT PRIMARY KEY
    table.date('shoot_date');
    table.integer('display_order').defaultTo(null);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('shoots');
};
