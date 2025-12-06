import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            dirname: "logs",
            filename: "proxy-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxFiles: "7d",
        })
    ]
});