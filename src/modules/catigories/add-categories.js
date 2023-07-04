const db = require("../../db");
const { BadRequestError } = require("../../shared/errors");

const AddCategories = async ({ name }) => {
  const existing = await db("categories")
    .where({ name })
    .select("id", "name")
    .returning(["id", "name"]);

  if (existing?.length) {
    throw new BadRequestError("Bu categories allaqachon mavjud");
  }

  const categories = db("categories")
    .insert({ name })
    .returning(["id", "name"]);

  return categories[0];
};

module.exports = AddCategories;