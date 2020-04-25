exports.up = (knex) => {
  return knex.schema.createTable('comments', (table) => {
      table.increments('id');
      table.string('content', 1000).notNullable();
      table.integer('title_id').unsigned();
      table.foreign('title_id').references('product_id').inTable('product').onDelete('CASCADE').onUpdate('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};
exports.down = (knex) => {
  return knex.schema.dropTable('comments');
};
