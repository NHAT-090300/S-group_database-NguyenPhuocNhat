exports.up = (knex) => {
    return knex.schema.createTable('productType', (table) => {
        table.increments('product_type_id').primary();
        table.string('product_type', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.integer('author_id').unsigned().references('users.id');
    });
  };
  exports.down = (knex) => {
    return knex.schema.dropTable('productType');
  };