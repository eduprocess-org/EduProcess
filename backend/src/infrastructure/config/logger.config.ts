import winston from 'winston';
import path from 'path';

const { combine, timestamp, json, colorize, simple } = winston.format;

const isTest = process.env.NODE_ENV === 'test';
const logDir = process.env.LOG_DIR || path.join(__dirname, '../../..', 'logs');

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.Console({
            silent: isTest,
            format: combine(colorize(), simple()),
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'eduprocess.log'),
            maxsize: 10 * 1024 * 1024,
            maxFiles: 5,
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'eduprocess-error.log'),
            level: 'error',
            maxsize: 10 * 1024 * 1024,
            maxFiles: 5,
        }),
    ],
});
