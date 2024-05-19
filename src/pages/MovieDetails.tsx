import { FC, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import useFetchMovieDetails from '../hooks/useFetchMovieDetails.tsx';
import { colors } from '../utils/constant.ts';
import { formatDateToDMY, roundVoteAverage } from '../utils/functions.ts';

/**
 * This functional component displays the details of a movie.
 * It uses the custom hook `useFetchMovieDetails` to fetch the movie details from an API.
 * The component retrieves the movie ID from the URL parameters.
 * It also scrolls the window to the top when the component mounts.
 * @returns JSX.Element - The rendered component.
 */
const MovieDetails: FC = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useFetchMovieDetails(id || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!id) return <p>{content.noId}</p>;
  if (loading) return (
    <CenterContainer>
      <CircularProgress />
    </CenterContainer>
  );
  if (error) return <p>{content.error} {error}</p>;

  return (
    <StyledContainer maxWidth="md">
      {movie ? (
        <StyledCard theme={theme}>
          <CardMedia
            height="600px"
            width="400px"
            component="img"
            alt={movie.title}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
          />
          <CardContent>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {movie.tagline}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {movie.overview}
            </Typography>
            <DetailBox>
              <DetailItem>
                <Typography variant="h6" component="span">
                  {content.releaseDate}
                </Typography>
                <Typography variant="body1" component="span">
                  {formatDateToDMY(movie.release_date)}
                </Typography>
              </DetailItem>
              <DetailItem>
                <Typography variant="h6" component="span">
                  {content.adult}
                </Typography>
                <Typography variant="body1" component="span">
                  {movie.adult ? '18+' : 'All ages'}
                </Typography>
              </DetailItem>
              <DetailItem>
                <Typography variant="h6" component="span">
                  {content.runtime}
                </Typography>
                <Typography variant="body1" component="span">
                  {movie.runtime} minutes
                </Typography>
              </DetailItem>
              <DetailItem>
                <Typography variant="h6" component="span">
                  Budget:
                </Typography>
                <Typography variant="body1" component="span">
                  {movie.budget.toLocaleString()} $
                </Typography>
              </DetailItem>
              <DetailItem>
                <Typography variant="h6" component="span">
                  {content.revenue}
                </Typography>
                <Typography variant="body1" component="span">
                  {movie.revenue.toLocaleString()} $
                </Typography>
              </DetailItem>
              <DetailItem>
                <Typography variant="h6" component="span">
                  {content.genres}
                </Typography>
                <Box component="span">
                  {movie.genres.map((genre) => (
                    <Chip key={genre.id} label={genre.name} variant="outlined" />
                  ))}
                </Box>
              </DetailItem>
              <DetailItem>
                <Typography variant="h6" component="span">
                  {content.language}
                </Typography>
                <Typography variant="body1" component="span">
                  {movie.original_language.toUpperCase()}
                </Typography>
              </DetailItem>
              <DetailItem>
                <Typography variant="h6" component="span">
                  {content.average}
                </Typography>
                <Typography variant="body1" component="span">
                  {roundVoteAverage(movie.vote_average)}{content.for} {movie.vote_count} {content.voteCount}
                </Typography>
              </DetailItem>
            </DetailBox>
          </CardContent>
        </StyledCard>
      ) : (
        <p>{content.noMovie}</p>
      )}
    </StyledContainer>
  );
};

export default MovieDetails;

const content = {
  noId: 'Error: No movie ID provided',
  loading: 'Loading...',
  error: 'Error fetching movie details',
  releaseDate: 'Release Date:',
  adult: 'Adults:',
  runtime: 'Runtime:',
  revenue: 'Revenue:',
  genres: 'Genres:',
  language: 'Language:',
  average: 'Vote Average:',
  voteCount: 'votes',
  for: '/10 for',
  noMovie: 'No movie details available',
};

const StyledContainer = styled(Container)`
  padding: 20px;
  background-color: ${colors.white};
  margin-top: 20px;
`;

const StyledCard = styled(Card)(({ theme }: { theme: Theme }) => `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${theme.breakpoints.down('md')} {
    flex-direction: column;
  }`);

const CenterContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const DetailBox = styled(Box)`
  margin-top: 20px;
`;

const DetailItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

