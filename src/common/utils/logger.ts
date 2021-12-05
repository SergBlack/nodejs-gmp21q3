import { createLogger, format, transports } from 'winston';

const {
  combine, errors, printf, timestamp, colorize,
} = format;

const logFormat = printf(({
  level, message, timestamp: ts, stack,
}) => `${ts} ${level}: ${stack || message}`);

export const logger = createLogger({
  format: combine(
    colorize(),
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    errors({ stack: true }),
    logFormat,
  ),
  transports: [new transports.Console()],
});
