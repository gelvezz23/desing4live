import Joi from "joi";
const email = Joi.string().email({ tlds: { allow: false } });
const password = Joi.string();
const name = Joi.string();

const role = Joi.array().items(Joi.string());

export const createRegisterDto = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
});
