import express, {
  Application, NextFunction, Request, Response,
} from 'express';
import bodyParser from 'body-parser';
import 'module-alias/register';

import authRouter from '@api/routes/auth.routes';
import usersRouter from '@api/routes/user.routes';
import groupsRouter from '@api/routes/group.routes';
import userGroupsRouter from '@api/routes/userGroup.routes';
import { logger } from '@common/utils/';
import { requestLogger } from '@api/middlewares/requestLogger';
import { apiErrorMiddleware } from '@api/middlewares/apiErrorMiddleware';
import { checkToken } from '@api/middlewares/checkToken';
import { ApiError } from '@api/errors/apiError';

const app: Application = express();

app.use(bodyParser.json());

app.use(requestLogger);
app.use('/auth', authRouter);
app.use('/users', checkToken, usersRouter);
app.use('/groups', checkToken, groupsRouter);
app.use('/userGroup', checkToken, userGroupsRouter);

app.get('/', (req: Request, res: Response) => {
  logger.info('User requested main page');
  res.send('Welcome to the users API!');
});

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(ApiError.sendNotFound());
});

app.use(apiErrorMiddleware);

export default app;
