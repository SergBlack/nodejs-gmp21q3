import express, {
  Application, NextFunction, Request, Response,
} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'module-alias/register';

import authRouter from '@api/routes/auth.routes';
import usersRouter from '@api/routes/user.routes';
import groupsRouter from '@api/routes/group.routes';
import userGroupsRouter from '@api/routes/userGroup.routes';
import { logger } from '@common/utils/';
import { requestLogger } from '@api/middlewares/requestLogger';
import { apiErrorMiddleware } from '@api/middlewares/apiErrorMiddleware';
import { ApiError } from '@api/errors/apiError';

const app: Application = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(requestLogger);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/userGroup', userGroupsRouter);

app.get('/', (req: Request, res: Response) => {
  logger.info('User requested main page');
  res.send('Welcome to the users API!');
});

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(ApiError.sendNotFound());
});

app.use(apiErrorMiddleware);

export default app;
