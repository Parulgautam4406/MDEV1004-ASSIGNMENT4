import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing a Movie document.
 */
export interface Movie extends Document {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  Response: string;
  Images: string[];
}
// Define the movie schema
const movieSchema: Schema = new mongoose.Schema({
  Title: String,
  Year: String,
  Rated: String,
  Released: String,
  Runtime: String,
  Genre: String,
  Director: String,
  Writer: String,
  Actors: String,
  Plot: String,
  Language: String,
  Country: String,
  Awards: String,
  Poster: String,
  Metascore: String,
  imdbRating: String,
  imdbVotes: String,
  imdbID: String,
  Type: String,
  Response: String,
  Images: [String],
});
// Create and export the movie model
export default mongoose.model<Movie>('Movie', movieSchema);