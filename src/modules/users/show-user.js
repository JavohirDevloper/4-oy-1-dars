const db = require('../../db');

const showUser = async ({ id }) => {
  const user = await db('users')
    .where({ id })
    .select('id', 'first_name', 'last_name', 'username', 'updated_at', 'created_at')
    .first();

  return { data: user };
};

module.exports = showUser;
