import { createLogger, format, transports } from 'winston';

const {
  combine, errors, printf, timestamp, colorize,
} = format;

const logFormat = printf(({
  level, message, timestamp: ts, stack, meta,
}) => `${ts} ${level}: ${stack || message} ${meta ? JSON.stringify(meta) : ''}`);

export const logger = createLogger({
  format: combine(
    colorize(),
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    errors({ stack: true }),
    logFormat,
  ),
  // defaultMeta: { service: 'user-service' },
  transports: [new transports.Console()],
});
