exports.up = (knex) => {
    return knex.schema.createTable('role', (table) => {
      table.increments('user_id');
      table.integer('admin').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('role');
};
  