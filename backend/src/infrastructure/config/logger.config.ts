import winston from 'winston';

const { combine, timestamp, json, colorize, simple } = winston.format;

const isTest = process.env.NODE_ENV === 'test';

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.Console({
            silent: isTest,
            format: combine(colorize(), simple()),
        }),
    ],
});
