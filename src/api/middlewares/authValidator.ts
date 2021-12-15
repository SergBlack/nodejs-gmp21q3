import Joi from 'joi';
import { ContainerTypes, createValidator, ValidatedRequestSchema } from 'express-joi-validation';

export const authValidator = createValidator();

export const authPostSchema = Joi.object({
  login: Joi.string().min(8).max(32).required(),
  password: Joi.string().alphanum().min(6).max(16)
    .required(),
});

export interface AuthRequestBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
  },
}
