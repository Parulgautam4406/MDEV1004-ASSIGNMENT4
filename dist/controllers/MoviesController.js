"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MovieModel_1 = __importDefault(require("../model/MovieModel"));
const logger_1 = __importDefault(require("../logger"));
class MoviesController {
    /**
     * Get all favourite movies.
     *
     * @param req The request object.
     * @param res The response object.
     */
    getAllFavouriteMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const favouriteMovies = yield MovieModel_1.default.find().lean();
                if (favouriteMovies.length === 0) {
                    logger_1.default.info('Favourite movies not found');
                    res.status(404).json({ message: 'No favourite movies found' });
                }
                else {
                    res.json(favouriteMovies);
                    logger_1.default.info('Favourite movies found');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in getAllFavouriteMovies method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Get a favourite movie by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    getFavouriteMovieByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const favouriteMovie = yield MovieModel_1.default.findById(id).lean();
                if (!favouriteMovie) {
                    res.status(404).json({ message: 'Movie not found' });
                }
                else {
                    res.json(favouriteMovie);
                    logger_1.default.info('Favourite Movie found');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in getFavouriteMovieByID method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Add a new movie.
     *
     * @param req The request object.
     * @param res The response object.
     */
    addFavouriteMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, Poster, Metascore, imdbRating, imdbVotes, imdbID, Type, Response, Images } = req.body; // Update destructuring
            try {
                const newFavouriteMovie = new MovieModel_1.default({
                    Title,
                    Year,
                    Rated,
                    Released,
                    Runtime,
                    Genre,
                    Director,
                    Writer,
                    Actors,
                    Plot,
                    Language,
                    Country,
                    Awards,
                    Poster,
                    Metascore,
                    imdbRating,
                    imdbVotes,
                    imdbID,
                    Type,
                    Response,
                    Images,
                });
                yield newFavouriteMovie.save();
                res.status(201).json(newFavouriteMovie);
                logger_1.default.info('Favourite movie added');
            }
            catch (error) {
                logger_1.default.error(`Error found in addFavouriteMovie method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Update an existing favourite movie by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    updateFavouriteMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updatedData = req.body;
            try {
                const updatedFavouriteMovie = yield MovieModel_1.default.findByIdAndUpdate(id, updatedData, { new: true }).lean();
                if (!updatedFavouriteMovie) {
                    res.status(404).json({ message: 'Movie not found' });
                }
                else {
                    res.json(updatedFavouriteMovie);
                    logger_1.default.info('Favourite movie updated');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in updateFavouriteMovie method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Delete an existing favourite movie by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    deleteFavouriteMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedFavouriteMovie = yield MovieModel_1.default.findByIdAndDelete(id).lean();
                if (!deletedFavouriteMovie) {
                    res.status(404).json({ message: 'Movie not found' });
                }
                else {
                    res.json({ message: 'Favourite movie deleted successfully' });
                    logger_1.default.info('Favourite movie deleted');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in deleteFavouriteMovie method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = MoviesController;
