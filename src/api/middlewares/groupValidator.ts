import Joi from 'joi';
import { ContainerTypes, createValidator, ValidatedRequestSchema } from 'express-joi-validation';
import { Permission } from '../../types/group';

export const groupValidator = createValidator();

const ALL_PERMISSIONS = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

export const groupSchema = Joi.object({
  name: Joi.string().min(3).max(32).required(),
  permissions: Joi.array().items(Joi.string().valid(...ALL_PERMISSIONS)),
});

export const groupGetByIdSchema = Joi.object({
  id: Joi.string().uuid(),
});

export interface GroupRequestBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    name: string;
    permissions: Permission[];
  },
}

export interface GroupRequestParamsSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: string;
  }
}
