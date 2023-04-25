import joi from "joi";
import {signInBody} from "../interfaces/interface"

  export const signInSchema = joi.object<signInBody>({
    email: joi.string().email().required(),
    password: joi.string().required().min(6).max(50)
  });
