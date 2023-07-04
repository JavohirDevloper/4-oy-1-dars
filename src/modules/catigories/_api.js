const router = require("express").Router();
//
const {
  listCategories,
  addCategories,
  showCategories,
  updateCategories,
  deleteCategories,
} = require("./_controllers");
//
router.get("/categories", listCategories);
router.post("/categories", addCategories);
router.get("/categories/:id", showCategories);
router.patch("/categories/:id", updateCategories);
router.delete("/categories/:id", deleteCategories);

module.exports = router;