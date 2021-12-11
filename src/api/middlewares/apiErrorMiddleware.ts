import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/apiError';
import { logger } from '../../common/utils';

// next?
export const apiErrorMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err);

  const code = err.code || 500;
  const message = err.message || 'Internal Server Error';
  const description = err.description;

  res.status(code).json({ code, message, description });
  // next(err);
};
