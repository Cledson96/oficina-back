import joi from "joi";
import {signUpBody} from "./../interfaces/interface"

  export const signupSchema = joi.object<signUpBody>({
    name: joi.string().required().min(6).max(50),
    password: joi.string().required().min(6).max(50),
    phone: joi.number().required(),
    phonecontact: joi.number(),
    cpf: joi.string().length(11).pattern(/^[0-9]+$/),
    payment: joi.string(),
    email: joi.string().email().required(),
  });
