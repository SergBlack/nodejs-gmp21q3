import Joi from 'joi';
import { ContainerTypes, createValidator, ValidatedRequestSchema } from 'express-joi-validation';

export const userValidator = createValidator();

export const userSchema = Joi.object({
  login: Joi.string().min(8).max(32).required(),
  password: Joi.string().alphanum().min(6).max(16)
    .required(),
  age: Joi.number().min(4).max(130).required(),
});

export interface UserRequestBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
  }
}
