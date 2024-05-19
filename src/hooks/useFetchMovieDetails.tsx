import axios, { AxiosError } from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { ApiError, MovieDetails } from '../utils/types';

/**
 * Interface for useFetchMovieDetails hook return parameters.
 */
interface UseFetchMovieDetailsParams {
  movie: MovieDetails | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to retrieve film details from the API.
 * @param {string} movieId - The ID of the film to be recovered.
 * @returns {UseFetchMovieDetailsParams} Film details, loading status and any errors.
 */
const useFetchMovieDetails = (movieId: string): UseFetchMovieDetailsParams => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetails = useCallback(async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      setError('API key is not available');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<MovieDetails | ApiError>(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );

      console.log('response =>', response);

      if ('status_code' in response.data) {
        setError(response.data.status_message);
        return;
      }

      setMovie(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response) {
          setError(axiosError.response.data.status_message);
        } else {
          setError(axiosError.message);
        }
      } else {
        setError('An unknown error occurred');
      }
      console.error('Error fetching movie details =>', error);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    void fetchMovieDetails();
  }, [fetchMovieDetails]);

  return { movie, loading, error };
};

export default useFetchMovieDetails;
