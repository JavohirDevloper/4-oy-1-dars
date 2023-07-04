const db = require("../../db");
const { NotFoundError } = require("../../shared/errors");

const UpdateCategories = async ({ name }, { id }) => {
  const existing = await db("categories").where({ id }).returning("*").first();

  if (!existing) {
    throw new NotFoundError("Categoriyalar topilmadi!");
  }

  const categories = await db("categories")
    .where({ id })
    .update({ name })
    .returning("*");

  return { success: categories[0] };
};

module.exports = UpdateCategories;