exports.up = (knex) => {
    return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.increments('productID').primary();
        table.string('productType', 255).notNullable();
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('users');
};
  