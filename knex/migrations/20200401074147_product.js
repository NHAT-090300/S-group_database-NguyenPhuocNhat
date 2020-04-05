exports.up = (knex) => {
    return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.increments('productID').primary();
        table.string('product', 255).notNullable();
        table.string('price').notNullable();
        table.string('color').notNullable();
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('users');
};
  