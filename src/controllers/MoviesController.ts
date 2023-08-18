import { Request, Response } from 'express';
import  Movie, { Movie as MovieInterface } from '../model/MovieModel';
import logger from '../logger';

class MoviesController {
  /**
   * Get all favourite movies.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async getAllFavouriteMovies(req: Request, res: Response): Promise<void> {
    try {
      const favouriteMovies = await Movie.find().lean();
      if (favouriteMovies.length === 0) {
        logger.info('Favourite movies not found');
        res.status(404).json({ message: 'No favourite movies found' });
      } else {
        res.json(favouriteMovies);
        logger.info('Favourite movies found');
      }
    } catch (error) {
      logger.error(`Error found in getAllFavouriteMovies method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get a favourite movie by ID.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async getFavouriteMovieByID(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const favouriteMovie = await Movie.findById(id).lean();
      if (!favouriteMovie) {
        res.status(404).json({ message: 'Movie not found' });
      } else {
        res.json(favouriteMovie);
        logger.info('Favourite Movie found');
      }
    } catch (error) {
      logger.error(`Error found in getFavouriteMovieByID method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Add a new movie.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async addFavouriteMovie(req: Request, res: Response): Promise<void> {
    const { Title, Year, Rated, Released, Runtime,
           Genre, Director, Writer, Actors, Plot, 
           Language, Country, Awards, Poster, Metascore, 
           imdbRating, imdbVotes, imdbID, Type, Response,
           Images } = req.body; // Update destructuring
    try {
      const newFavouriteMovie: MovieInterface = new Movie({
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
      await newFavouriteMovie.save();
      res.status(201).json(newFavouriteMovie);
      logger.info('Favourite movie added');
    } catch (error) {
      logger.error(`Error found in addFavouriteMovie method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Update an existing favourite movie by ID.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async updateFavouriteMovie(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const updatedFavouriteMovie = await Movie.findByIdAndUpdate(id, updatedData, { new: true }).lean();
      if (!updatedFavouriteMovie) {
        res.status(404).json({ message: 'Movie not found' });
      } else {
        res.json(updatedFavouriteMovie);
        logger.info('Favourite movie updated');
      }
    } catch (error) {
      logger.error(`Error found in updateFavouriteMovie method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Delete an existing favourite movie by ID.
   * 
   * @param req The request object.
   * @param res The response object.
   */
  public async deleteFavouriteMovie(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deletedFavouriteMovie = await Movie.findByIdAndDelete(id).lean();
      if (!deletedFavouriteMovie) {
        res.status(404).json({ message: 'Movie not found' });
      } else {
        res.json({ message: 'Favourite movie deleted successfully' });
        logger.info('Favourite movie deleted');
      }
    } catch (error) {
      logger.error(`Error found in deleteFavouriteMovie method: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default MoviesController;
