"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
// Create a new logger instance
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), // Add a timestamp to log messages
    winston_1.default.format.json() // Log messages in JSON format
    ),
    transports: [
        // Define log destinations (e.g., console, file)
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'info.log', level: 'info' }) // Output Info logs to a file
    ]
});
exports.default = logger;
