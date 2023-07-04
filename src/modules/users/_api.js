const express = require("express");
const {
  getUsers,
  getUser,
  loginUser,
  addUser,
  deleteUser,
  updateUser,
} = require("./_controllers");

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users/login", loginUser);
router.post("/users", addUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;