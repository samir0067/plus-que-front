/**
 * This interface defines the structure of an API error response.
 */
export interface ApiError {
  success: boolean;
  status_code: number;
  status_message: string;
}

/**
 * This interface defines the structure of a collection to which a movie belongs.
 */
interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

/**
 * This interface defines the structure of a movie genre.
 */
interface Genre {
  id: number;
  name: string;
}

/**
 * This interface defines the structure of a production company.
 */
interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

/**
 * This interface defines the structure of a production country.
 */
interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

/**
 * This interface defines the structure of a spoken language.
 */
interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

/**
 * This interface defines the detailed structure of a movie.
 */
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * This interface defines the structure of a movie in the movie list response.
 */
export interface Movie {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  title: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * This interface defines the structure of the movie list response from the API.
 */
export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
