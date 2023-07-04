const db = require("../../db");
const bcrypt = require("bcryptjs");
const { BadRequestError } = require("../../shared/errors");

const AddUser = async ({
  first_name,
  last_name,
  username,
  password,
  role,
}) => {
  const checkUser = await db("users").where({ username }).select("*").first();

  if (checkUser) {
    throw new BadRequestError("Bu nomga ega foydalanuvchi allaqachon mavjud!");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await db("users")
    .insert({
      first_name,
      last_name,
      username,
      password: hashPassword,
      role,
    })
    .returning([
      "id",
      "first_name",
      "last_name",
      "username",
      "role",
    //   "created_at",
    //   "updated_at",
    ]);

  return user;
};

module.exports = AddUser;