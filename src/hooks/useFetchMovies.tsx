import axios, { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ApiError, MovieResponse } from '../utils/types.ts';

interface UseFetchMoviesParams {
  data: MovieResponse | null;
  loading: boolean;
  error: string | null;
}

/**
 * This hook fetches trending movies from the API with pagination.
 * @param period The period for which to fetch trending movies.
 * @param page The page number to fetch.
 * @returns An object containing the fetched data, loading state, and error message.
 */
const useFetchMovies = (period: 'day' | 'week', page: number): UseFetchMoviesParams => {
  const [data, setData] = useState<MovieResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      setError('API key is not available');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<MovieResponse | ApiError>(
        `https://api.themoviedb.org/3/trending/movie/${period}?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );

      if ('status_code' in response.data) {
        setError(response.data.status_message);
        return;
      }

      setData(response.data);
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
      console.error('Error fetching movies =>', error);
    } finally {
      setLoading(false);
    }
  }, [period, page]);

  useEffect(() => {
    void fetchMovies();
  }, [fetchMovies]);

  return { data, loading, error };
};

export default useFetchMovies;
