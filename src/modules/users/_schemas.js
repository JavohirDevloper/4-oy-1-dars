const Joi = require("joi");

exports.getUserSchema = {
  params: Joi.object({
    id: Joi.number().integer(),
  }),
};

exports.getUserListSchema = {
  query: Joi.object({
    q: Joi.string(),
    limit: Joi.number().integer(),
    offset: Joi.number().integer(),
    sort_by: Joi.string().valid("desc", "asc"),
    sort_order: Joi.string(),
    is_deleted: Joi.boolean(),
  }),
};

exports.loginUserSchema = {
  body: Joi.object({
    username: Joi.string().required().min(3).max(20),
    password: Joi.string().required().min(5).max(20),
  }),
};

exports.addUserSchema = {
  body: Joi.object({
    first_name: Joi.string().required().max(30).min(3),
    last_name: Joi.string().required().max(30).min(3),
    username: Joi.string().required().min(3).max(20),
    password: Joi.string().required().min(5).max(20),
    role: Joi.string().required().valid("admin", "xizmatkor"),
  }),
};

exports.deleteUserSchema = {
  params: Joi.object({
    id: Joi.number().integer(),
  }),
};

exports.updateUserSchema = {
  body: Joi.object({
    first_name: Joi.string().max(30).min(3),
    last_name: Joi.string().max(30).min(3),
    username: Joi.string().min(3).max(20),
    password: Joi.string().min(5).max(20),
    role: Joi.string().valid("admin", "xizmatkor"),
  }),
  params: Joi.object({
    id: Joi.number().integer(),
  }),
};