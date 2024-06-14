/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('photos', (table) => {
    table.increments('id').primary(); // INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    table.integer('shoot_id').unsigned().notNullable(); // shoot_id INT NOT NULL
    table.string('photo_url', 255).notNullable();
    table.integer('display_order').defaultTo(null);
    table.foreign('shoot_id').references('id').inTable('shoots').onDelete('CASCADE'); // FOREIGN KEY (shoot_id) REFERENCES shoots(id) ON DELETE CASCADE
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('photos');
};
