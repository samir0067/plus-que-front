import { FC } from 'react';
import useFetchMovieDetails from '../hooks/useFetchMovieDetails.tsx';

const MovieDetails: FC = () => {
  const { movie, loading, error } = useFetchMovieDetails('12');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
