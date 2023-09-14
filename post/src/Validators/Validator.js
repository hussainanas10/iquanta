import Joi from "joi";
import * as constants from '../constants/constants.js';

const register = Joi.object().keys({
  name: Joi.string().trim().max(255).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(6).required(),
  type: Joi.string().required(),
  metadata: Joi.object().required()
});

const login = Joi.object().keys({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(6).required(),
});


export default {
  register,
  login
};