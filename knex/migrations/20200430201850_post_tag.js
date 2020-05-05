exports.up = (knex) => {
  return knex.schema.createTable('post_tag', (table) => {
      table.increments('id');
      table.integer('tagID').unsigned();
      table.integer('postID').unsigned();
      table.foreign('tagID').references('id').inTable('tag').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('postID').references('product_id').inTable('product').onDelete('CASCADE').onUpdate('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};
exports.down = (knex) => {
  return knex.schema.dropTable('post_tag');
};
