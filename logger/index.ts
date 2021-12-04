import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  // defaultMeta: { service: 'user-service ' },
  transports: [
    new winston.transports.Console(),
  ],
});
