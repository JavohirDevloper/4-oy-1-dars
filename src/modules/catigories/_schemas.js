const Joi = require("joi");

exports.categoriesListSchema = {
  query: Joi.object({
    q: Joi.string(),
    limit: Joi.number().integer(),
    offset: Joi.number().integer(),
    sort_by: Joi.string().valid("desc", "asc"),
    sort_order: Joi.string(),
    is_deleted: Joi.boolean(),
  }),
};

exports.addCategoriesSchema = {
  body: Joi.object({
    name: Joi.string().required().max(20).min(2),
  }),
};

exports.showCategoriesSchema = {
  params: Joi.object({
    id: Joi.number().integer(),
  }),
};

exports.updateCategoriesSchema = {
  params: Joi.object({
    id: Joi.number().integer(),
  }),
  body: Joi.object({
    name: Joi.string().max(20).min(2),
  }),
};

exports.deleteCategoriesSchema = {
  params: Joi.object({
    id: Joi.number().integer(),
  }),
};