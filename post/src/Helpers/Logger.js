import fs from 'fs/promises';
import path from 'path';
// import rfs from 'rotating-file-stream';
import rfs from 'rotating-file-stream';
import { createLogger, format, transports } from 'winston';
import winston from 'winston';
import winstonDailyRotate from 'winston-daily-rotate-file';
const { combine, errors, json } = format;

const logFile = process.env.LOG_FILE || 'app';

// Logs middleware
const logDirectory = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  '../../storage/logs'
);
(async () => {
  try {
    await fs.mkdir(logDirectory, { recursive: true }); // Creates directory and its parents if not exists
    console.log('Log directory created successfully.');
  } catch (error) {
    console.error('Error creating directory:', error);
  }
})();


const transport = new winstonDailyRotate({
  filename: path.join(logDirectory, 'app-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10M',
  maxFiles: '7d', // Keep logs for 7 days
});

// const stream = rfs('app.log', {
//     size: '10M',
//     interval: '1d',
//     path: logDirectory,
//     compress: 'gzip'
//   });

  // const logTransports = [
  //   new transports.File({ filename: path.join(`${logDirectory}/${logFile}.log`) })
  // ];

  let logLevel;

  switch (process.env.APP_ENV) {
    case 'development':
      console.log('Enabling development log.................');
      transports.push(new transports.Console({ format: format.simple() }));
      logLevel = 'debug';
      break;
    case 'staging':
      console.log('Enabling staging log.................');
      transports.push(new transports.Console({ format: format.simple() }));
      logLevel = 'info';
      break;
    case 'production':
      console.log('Enabling production log.................');
      logLevel = 'warn';
      break;
    default:
      logLevel = 'info';
  }

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [transport],
  });

  // const Logger = createLogger({
  //   level: logLevel,
  //   format: combine(format.timestamp(), format.splat(), errors({ stack: true }), json()),
  //   transports: logTransports
  // });

  // module.exports = Logger;

  // Logger.js (ES module syntax)

// export const logMessage = message => {
//   console.log(message);
// };

// export const logError = error => {
//   console.error(error);
// };