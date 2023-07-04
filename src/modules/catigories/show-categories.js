const db = require("../../db");
const { NotFoundError } = require("../../shared/errors");

const ShowCategories = async ({ id }) => {
  const categories = await db("categories").where({ id }).select("*").first();

  if (!categories) {
    throw new NotFoundError("Categoriyalar topilmadi");
  }

  return categories;
};

module.exports = ShowCategories;