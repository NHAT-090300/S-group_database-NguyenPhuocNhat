
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {
        id: 1,
        fullname: 'John Doe',
        username: 'jonh',
        email: 'nigel@email.com',
        password: 'dorwssap',
      },
      {
        id: 2,
        fullname: 'John Doe 1',
        username: 'jonh 1',
        email: 'nakaz@email.com',
        password: 'password1',
      }
    ]);
  });
};