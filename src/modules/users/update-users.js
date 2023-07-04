const db = require("../../db");
const { NotFoundError } = require("../../shared/errors");
const bcrypt = require("bcryptjs");

const sUpdateUser = async ({ id }, changes) => {
  if (changes.password) {
    const newPassword = await bcrypt.hash(changes.password, 10);
    changes.password = newPassword;
  }

  const user = await db("users")
    .where({ id })
    .update(changes)
    .returning([
      "id",
      "first_name",
      "last_name",
      "username",
      "role",
    //   "is_deleted",
    ]);

  if (!user || !user.length) {
    throw new NotFoundError("Foydalanuvchi topilmadi!");
  }
  return { success: user[0] };
};

module.exports = sUpdateUser;