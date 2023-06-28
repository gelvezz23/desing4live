import Joi from "joi";
const email = Joi.string().email({ tlds: { allow: false } });
const password = Joi.string();
const role = Joi.array().items(Joi.string());

export const createSignInDto = Joi.object({
  email: email.required(),
  password: password.required(),
});
