import joi from "joi";

export const signupSchema = joi.object({
  name: joi.string().required().min(6).max(50),
  address: joi.string().required().min(2).max(80),
  cep: joi.number().required(),
  password: joi.string().required(),
  phone: joi.number().required(),
  phonecontact: joi.number().required(),
  cpf: joi.number().required(),
  payment: joi.string(),
  email: joi.string().email().required(),
});
