const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  getUserSchema,
  loginUserSchema,
  addUserSchema,
  deleteUserSchema,
  updateUserSchema,
  getUserListSchema,
} = require("./_schemas");
const { isLoggedIn, hasRole } = require("../../shared/auth");
const { UnauthorizedError } = require("../../shared/errors");
//
const {
  listUsers,
  AddUser,
  LoginUser,
  showUser,
  DeleteUser,
  UpdateUser,
} = require(".");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getUsers = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, getUserListSchema);
    //
    const result = await listUsers(req, res, next);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getUser = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, getUserSchema);

    const result = await showUser({ id: req.params.id });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const loginUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, loginUserSchema);
    const result = await LoginUser(({ password, username } = req.body));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const addUser = async (req, res, next) => {
  try {
    const { error } = await isLoggedIn(req, res, next);
    if (error) {
      throw new UnauthorizedError(error);
    }
    //
    hasRole({ req, res, next }, ["admin", "super_admin"]);
    //
    httpValidator({ body: req.body }, addUserSchema);
    //
    const result = await AddUser(
      ({ first_name, last_name, password, username, role } = req.body)
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const updateUser = async (req, res, next) => {
  try {
    const { error } = await isLoggedIn(req, res, next);
    if (error) {
      throw new UnauthorizedError(error);
    }
    //
    hasRole({ req, res, next }, ["admin", "super_admin"]);
    //
    httpValidator({ body: req.body, params: req.params }, updateUserSchema);
    //

    const result = await UpdateUser(
      ({ id } = req.params),
      ({ ...changes } = req.body)
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const deleteUser = async (req, res, next) => {
  try {
    const { error } = await isLoggedIn(req, res, next);
    if (error) {
      throw new UnauthorizedError(error);
    }
    //
    hasRole({ req, res, next }, ["admin", "super_admin"]);
    //
    httpValidator({ params: req.params }, deleteUserSchema);
    //
    const result = await DeleteUser(({ id } = req.params));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  loginUser,
  addUser,
  deleteUser,
  updateUser,
};