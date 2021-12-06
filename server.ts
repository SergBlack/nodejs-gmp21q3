import app from './app';
import initDb from './src/db/init';
import { logger } from './src/common/utils';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  app.listen(PORT, () => {
    logger.info(`Server running on port: http://localhost:${PORT}`);
  });
};

initDb().then(startServer);

process.on('uncaughtException', ((error, origin) => {
  logger.error(`Caught exception: ${error}\nException origin: ${origin}`);
}));
