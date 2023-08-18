"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes/routes"));
const configurations_1 = __importDefault(require("./config/configurations"));
const logger_1 = __importDefault(require("./logger"));
const app = (0, express_1.default)();
const PORT = configurations_1.default.port;
//DataBase connection handling
mongoose_1.default.connect(configurations_1.default.mongoURI)
    .then(() => {
    logger_1.default.info('Connected to MongoDB Database');
    app.listen(PORT, () => {
        logger_1.default.info(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    logger_1.default.error('Error in connecting to MongoDB Database:', error);
});
// Use CORS middleware
app.use((0, cors_1.default)());
// Middleware for parsing JSON
app.use(express_1.default.json());
// Handling Routes
app.use('/favouriteMovies', routes_1.default);
// Error handling
const errorHandler = (err, req, res, next) => {
    logger_1.default.error('Error:', err.stack);
    res.status(500).json({ error: 'Internal server error' });
};
app.use(errorHandler);
exports.default = app;
