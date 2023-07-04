const express = require("express");
const { UnauthorizedError } = require("../errors");
const jwt = require("jsonwebtoken");
const config = require("../../shared/config");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const isLoggedIn = async (req, res, next) => {
  try {
    const { authorization: token } = req?.headers;

    if (!token) {
      throw new UnauthorizedError("Login qilishingiz kerak!");
    }

    const decoded = jwt.verify(token, config.jwt.secret);

    if (!decoded) {
      throw new UnauthorizedError("Login qilishingiz kerak!");
    }
    req.user = { id: decoded.id, role: decoded.role };
    return { error: null };
  } catch (error) {
    return { error };
  }
};

module.exports = isLoggedIn;