exports.up = (knex) => {
  return knex.schema.createTable('shoots', (table) => {
    table.increments('id').primary();
    table.date('shoot_date');
    table.integer('display_order').defaultTo(null);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('shoots');
};
