import winston from 'winston';

// Create a new logger instance
const logger = winston.createLogger({
  level: 'info', // Set the log level (e.g., 'info', 'debug', 'error')
  format: winston.format.combine(
    winston.format.timestamp(), // Add a timestamp to log messages
    winston.format.json() // Log messages in JSON format
  ),
  transports: [
    // Define log destinations (e.g., console, file)
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Output error logs to a file
    new winston.transports.File({ filename: 'info.log', level: 'info' }) // Output Info logs to a file
  ]
});

export default logger;