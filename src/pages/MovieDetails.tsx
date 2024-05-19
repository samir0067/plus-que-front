import { FC, useEffect } from 'react';
import useFetchMovieDetails from '../hooks/useFetchMovieDetails.tsx';
import { useParams } from 'react-router-dom';

/**
 * This functional component displays the details of a movie.
 * It uses the custom hook `useFetchMovieDetails` to fetch the movie details from an API.
 * The component retrieves the movie ID from the URL parameters.
 * It also scrolls the window to the top when the component mounts.
 * @returns JSX.Element - The rendered component.
 */
const MovieDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useFetchMovieDetails(id || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!id) return <p>{content.noId}</p>;
  if (loading) return <p>{content.loading}</p>;
  if (error) return <p>{content.error} {error}</p>;

  return (
    <div>
      {movie ? (
        <>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
        </>
      ) : (
        <p>No movie details available</p>
      )}
    </div>
  );
};

export default MovieDetails;

const content = {
  noId: 'Error: No movie ID provided',
  loading: 'Loading...',
  error: 'Error fetching movie details',
};
