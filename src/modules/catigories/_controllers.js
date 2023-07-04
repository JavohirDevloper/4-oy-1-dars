const express = require("express");
const httpValidator = require("../../shared/http-validator");
const { UnauthorizedError } = require("../../shared/errors");
//
const { hasRole, isLoggedIn } = require("../../shared/auth");
//
const {
  ListCategories,
  AddCategories,
  ShowCategories,
  UpdateCategories,
  DeleteCategories,
} = require(".");
//
const {
  categoriesListSchema,
  addCategoriesSchema,
  showCategoriesSchema,
  updateCategoriesSchema,
  deleteCategoriesSchema,
} = require("./_schemas");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const listCategories = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, categoriesListSchema);
    //
    const result = await ListCategories(req, res, next);
    //
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const showCategories = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showCategoriesSchema);
    //
    const result = await ShowCategories(({ id } = req.params));
    //
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const addCategories = async (req, res, next) => {
  try {
    const { error } = await isLoggedIn(req, res, next);
    if (error) {
      throw new UnauthorizedError(error);
    }
    //
    hasRole({ req, res, next }, ["admin", "super_admin"]);
    //
    httpValidator({ body: req.body }, addCategoriesSchema);
    //
    const result = await AddCategories(({ name } = req.body));
    //
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const updateCategories = async (req, res, next) => {
  try {
    const { error } = await isLoggedIn(req, res, next);
    if (error) {
      throw new UnauthorizedError(error);
    }
    //
    hasRole({ req, res, next }, ["admin", "super_admin"]);
    //
    httpValidator(
      { body: req.body, params: req.params },
      updateCategoriesSchema
    );
    //
    const result = await UpdateCategories(
      ({ name } = req.body),
      ({ id } = req.params)
    );
    //
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const deleteCategories = async (req, res, next) => {
  try {
    const { error } = await isLoggedIn(req, res, next);
    if (error) {
      throw new UnauthorizedError(error);
    }
    //
    hasRole({ req, res, next }, ["admin", "super_admin"]);
    //
    httpValidator({ params: req.params }, deleteCategoriesSchema);
    //
    const result = await DeleteCategories(({ id } = req.params));
    //
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listCategories,
  addCategories,
  showCategories,
  updateCategories,
  deleteCategories,
};
