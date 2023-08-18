"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MoviesController_1 = __importDefault(require("../controllers/MoviesController"));
const Auth_1 = require("../controllers/Auth");
const JwtUtils_1 = require("../utils/JwtUtils");
const router = (0, express_1.Router)();
const moviesController = new MoviesController_1.default();
//user login
router.post('/user_login', Auth_1.login);
//user registeration
router.post('/user_register', Auth_1.register);
// Get all favourite movies
router.get('/get_movies', JwtUtils_1.authenticateToken, moviesController.getAllFavouriteMovies);
// Get favourite movie by ID
router.get('/get_movie/:id', JwtUtils_1.authenticateToken, moviesController.getFavouriteMovieByID);
// Add a new movie
router.post('/add_movie', JwtUtils_1.authenticateToken, moviesController.addFavouriteMovie);
// Update an existing movie by ID
router.put('/update_movie/:id', JwtUtils_1.authenticateToken, moviesController.updateFavouriteMovie);
// Delete an existing movie by ID
router.delete('/delete_movie/:id', JwtUtils_1.authenticateToken, moviesController.deleteFavouriteMovie);
exports.default = router;
