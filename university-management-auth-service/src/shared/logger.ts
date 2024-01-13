import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;
import path from 'path';


// Formatter
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});


const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'right meow!' }),
        timestamp(),
        myFormat
    ),
    transports: [

        new transports.Console(),
        new transports.File({ filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'), level: 'info' }),

    ],
});

const errorLogger = createLogger({
    level: 'error',
    format: combine(
        label({ label: 'right meow!' }),
        timestamp(),
        myFormat
    ),
    transports: [

        new transports.Console(),
        new transports.File({ filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'), level: 'error' }),

    ],
});
export { logger, errorLogger };