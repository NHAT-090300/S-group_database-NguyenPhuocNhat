exports.up = (knex) => {
    return knex.schema.createTable('product', (table) => {
        table.increments('product_id');
        table.string('product', 255).notNullable();
        table.string('price', 255).notNullable();
        table.string('color', 255).notNullable();
        table.string('content', 1000).notNullable();
        table.string('product_slug').notNullable();
        table.integer('type_id').unsigned();
        table.foreign('type_id').references('product_type_id').inTable('productType').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  exports.down = (knex) => {
    return knex.schema.dropTable('product');
  };