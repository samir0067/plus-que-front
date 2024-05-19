import { FC, Fragment } from 'react';
import { Card, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Movie } from '../utils/types.ts';
import { truncateText } from '../utils/functions.ts';
import { useNavigate } from 'react-router-dom';

/**
 * This interface defines the props that the MovieCard component expects.
 */
interface MovieCardProps {
  movie: Movie;
}

/**
 * This functional component displays information about a movie in a card format.
 * @param {MovieCardProps} props - The props for the component.
 * @returns JSX.Element - The rendered component.
 */
const MovieCard: FC<MovieCardProps> = ({ movie }: MovieCardProps) => {
  const hasOverview = movie.overview && movie.overview.trim().length > 2;
  const truncatedOverview = hasOverview ? truncateText(movie.overview, 65) : '';
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography component="h3" variant="h5" fontWeight="bold">
          {movie.title}
        </Typography>
        <Typography component="p" variant="body2" mt="5px">
          <strong>Lang:</strong> {movie.original_language}
        </Typography>
        {hasOverview && (
          <Fragment>
            <Typography component="p" variant="body2" mt="5px">
              <strong>{content.overview}</strong> {truncatedOverview}
            </Typography>
          </Fragment>
        )}
        <Typography component="p" variant="body2" mt="5px">
          <strong>{content.releaseDate}</strong> {movie.release_date}
        </Typography>
        <Typography component="legend" variant="body2" mt="5px">
          <strong>{content.rating}</strong> ({movie.vote_count} {content.voteCount})
        </Typography>
        <Rating name="rating" value={movie.vote_average} max={10} readOnly />
      </CardContent>
    </StyledCard>
  );
};

export default MovieCard;

const content = {
  overview: 'Description:',
  releaseDate: 'Release Date:',
  rating: 'Rating:',
  voteCount: 'votes',
  readMore: 'Read More',
};

const StyledCard = styled(Card)(
  ({ theme }) => `
  max-width: 345px;
  margin: 20px;
  border-radius: 17px;
  cursor: pointer;
  ${theme.breakpoints.down('sm')} {
    max-width: 100%;
  }`,
);
