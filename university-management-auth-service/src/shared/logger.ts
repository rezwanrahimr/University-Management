import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf, prettyPrint } = format;
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// Formatter
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${date.toString()} ${hours} ${minutes} ${seconds} [${label}] ${level}: ${message}`;
});


const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'right meow!' }),
        timestamp(),
        myFormat, prettyPrint()
    ),
    transports: [

        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 'logs', 'winston', 'success', 'University-Auth-Success-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })

    ],
});

const errorLogger = createLogger({
    level: 'error',
    format: combine(
        label({ label: 'right meow!' }),
        timestamp(),
        myFormat, prettyPrint()),
    transports: [

        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 'logs', 'winston', 'errors', 'University-Auth-Error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })

    ],
});
export { logger, errorLogger };