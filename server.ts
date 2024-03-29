import app from './app';
import initDb from '@db/init';
import { logger } from '@common/utils';
import { dbTestConnection } from '@db/dbTestConnection';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  app.listen(PORT, () => {
    logger.info(`Server running on port: http://localhost:${PORT}`);
  });
};

initDb().then(dbTestConnection).then(startServer);

process.on('uncaughtException', ((error, origin) => {
  logger.error(`Caught exception: ${error}\nException origin: ${origin}`);
}));
