const db = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../shared/config");
const { NotFoundError, BadRequestError } = require("../../shared/errors");

const LoginUser = async ({ username, password }) => {
  const user = await db("users").where({ username }).select("*").first();

  if (!user) {
    throw new NotFoundError("Foydalanuvchi topilmadi!");
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new BadRequestError("Parol noto'g'ri kiritilgan!");
  }

  const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, {
    expiresIn: "1d",
  });

  return { token };
};

module.exports = LoginUser;