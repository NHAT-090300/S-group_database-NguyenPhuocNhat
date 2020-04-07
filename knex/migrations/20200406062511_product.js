exports.up = (knex) => {
    return knex.schema.createTable('product', (table) => {
        table.increments('product_id');
        table.string('product', 255).notNullable();
        table.string('price', 255).notNullable();
        table.string('color', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now()); 
        table.integer('type_id').unsigned();
        table.foreign('type_id').references('product_type_id').inTable('productType').onDelete('CASCADE');
    });
  };
  exports.down = (knex) => {
    return knex.schema.dropTable('product');
  };