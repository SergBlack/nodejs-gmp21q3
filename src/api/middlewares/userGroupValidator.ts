import Joi from 'joi';
import { ContainerTypes, createValidator, ValidatedRequestSchema } from 'express-joi-validation';

export const userGroupValidator = createValidator();

export const userGroupSchema = Joi.object({
  groupId: Joi.string().uuid().required(),
  userIds: Joi.array().items(Joi.string().uuid().required()),
});

export interface UserGroupRequestBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    groupId: string;
    userIds: string[];
  },
}
