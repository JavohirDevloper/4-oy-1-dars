const db = require("../../db");
const { NotFoundError } = require("../../shared/errors");
const ListCategories = async (req, res, next) => {
  const {
    q,
    limit = 5,
    offset = 0,
    sort_by = "updated_at",
    sort_order = "desc",
    is_deleted = false,
  } = req.query;

  const list = db("categories").select("*");

  if (q) {
    list.whereILike("name", `%${q}%`);
  }

  if (is_deleted === "true") {
    console.log(console.log(is_deleted));
    list.where({ is_deleted: "true" });
  }

  list.orderBy(sort_by, sort_order);
  list.limit(limit).offset(offset);

  const categories = await list;

  if (!categories.length) {
    throw new NotFoundError("Categoriyalar topilmadi!");
  }
  console.log(categories);
  return { categories, count: categories.length };
};

module.exports = ListCategories;