import { Router } from 'express';
import MoviesController from '../controllers/MoviesController';
import { register, login } from '../controllers/Auth';
import { authenticateToken } from '../utils/JwtUtils';

const router = Router();
const moviesController = new MoviesController();
//user login
router.post('/user_login', login);
//user registeration
router.post('/user_register', register);

// Get all favourite movies
router.get('/get_movies',authenticateToken, moviesController.getAllFavouriteMovies);

// Get favourite movie by ID
router.get('/get_movie/:id',authenticateToken, moviesController.getFavouriteMovieByID);

// Add a new movie
router.post('/add_movie',authenticateToken, moviesController.addFavouriteMovie);

// Update an existing movie by ID
router.put('/update_movie/:id',authenticateToken, moviesController.updateFavouriteMovie);

// Delete an existing movie by ID
router.delete('/delete_movie/:id',authenticateToken, moviesController.deleteFavouriteMovie);

export default router;
