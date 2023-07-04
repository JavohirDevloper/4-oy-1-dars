const db = require("../../db");
const { NotFoundError } = require("../../shared/errors");

const DeleteUser = async ({ id }) => {
  const user = await db("users")
    .where({ id })
    .update({ is_deleted: "true" })
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

module.exports = DeleteUser;