import { FC, Fragment } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Movie } from '../utils/types.ts';
import { truncateText } from '../utils/truncateText.ts';

interface MovieCardProps {
  movie: Movie;
}


const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  console.log('MovieCard ==>', movie);
  const hasOverview = movie.overview && movie.overview.trim().length > 2;
  const truncatedOverview = hasOverview ? truncateText(movie.overview, 50) : ''

  return (
    <StyledCard>
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography mt="5px" variant="body2" component="div">
          <strong>Lang:</strong> {movie.original_language}
        </Typography>
        {hasOverview && (
          <Fragment>
            <Typography mt="5px"  variant="body1" component="div">
              <strong>Description:</strong> {truncatedOverview}
            </Typography>
          </Fragment>
        )}
        <Typography mt="5px"  variant="body2">
          <strong>Release Date:</strong> {movie.release_date}
        </Typography>
        <Typography mt="5px"  variant="body2">
          <strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default MovieCard;

const StyledCard = styled(Card)(({ theme }) => `
  max-width: 345px;
  margin: 20px;
  border-radius: 17px;
  ${theme.breakpoints.down('sm')} {
    max-width: 100%;
  }`,
);
