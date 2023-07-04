const db = require("../../db");
const { NotFoundError } = require("../../shared/errors");

const DeleteCategories = async ({ id }) => {
  console.log(id);
  const existing = db("categories").where({ id }).returning("*").first();

  if (!existing) {
    throw new NotFoundError("Categoriyalar topilmadi!");
  }

  const categories = await db("categories")
    .where({ id })
    .update({ is_deleted: "true" })
    .returning("*");

  return { success: categories[0] };
};

module.exports = DeleteCategories;