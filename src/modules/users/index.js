const listUsers = require("./list-users"),
  showUser = require("./show-user"),
  LoginUser = require("./login-users"),
  AddUser = require("./add-users"),
  DeleteUser = require("./delete-users"),
  UpdateUser = require("./update-users");

module.exports = {
  listUsers,
  AddUser,
  showUser,
  LoginUser,
  DeleteUser,
  UpdateUser,
};