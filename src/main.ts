import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/routes';
import config from './config/configurations';
import logger from './logger';

const app = express();
const PORT = config.port;

//DataBase connection handling
mongoose.connect(config.mongoURI)
  .then(() => {
    logger.info('Connected to MongoDB Database');
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  }).catch((error) => {
    logger.error('Error in connecting to MongoDB Database:', error);
  });
  
// Use CORS middleware
app.use(cors());
// Middleware for parsing JSON
app.use(express.json());

// Handling Routes
app.use('/favouriteMovies', routes);

// Error handling
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error('Error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
};
app.use(errorHandler);

export default app;
