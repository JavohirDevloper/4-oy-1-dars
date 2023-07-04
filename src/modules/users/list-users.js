const db = require('../../db');

const listUsers = async () => {
  const dbQuery = db('users').select(
    'id',
    'first_name',
    'last_name',
    'username',
    // 'updated_at',
    // 'created_at'
  );

  const list = await dbQuery;

  return {
    list,
    count: list.length,
  };
};

module.exports = listUsers;
