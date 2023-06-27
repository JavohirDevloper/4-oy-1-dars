const bcrypt = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      // id: 1,
      first_name: 'Abdulloh',
      last_name: 'Musayev',
      username: 'musayev',
      password: bcrypt.hashSync('foobar', 10),
      is_deleted: false,
    },
    {
      // id: 2,
      first_name: 'Sardor',
      last_name: 'Aliyev',
      username: 'sardor',
      password: bcrypt.hashSync('foobar', 10),
      is_deleted: false,
    },
    {
      // id: 3,
      first_name: 'Usmon',
      last_name: 'Valiyev',
      username: 'valiyev',
      password: bcrypt.hashSync('foobar', 10),
      is_deleted: false,
    },
  ]);
};

