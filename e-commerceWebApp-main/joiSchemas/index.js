const Joi = require("@hapi/joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createUserSchema = Joi.object({
  nom: Joi.string().required().min(4).max(20),
  prenom: Joi.string().required().min(4).max(20),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
});

module.exports = { loginSchema, createUserSchema };
