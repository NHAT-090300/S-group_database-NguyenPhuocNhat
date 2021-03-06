exports.up = (knex) => {
    return knex.schema.createTable('images', (table) => {
        table.increments('img_id');
        table.string('path', 255).notNullable();

        table.integer('product_id').unsigned();
        table.foreign('product_id').references('product_id').inTable('product').onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  exports.down = (knex) => {
    return knex.schema.dropTable('images');
  };
