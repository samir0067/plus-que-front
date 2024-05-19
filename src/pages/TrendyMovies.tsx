import { FC, useEffect } from 'react';
import { Alert, Box, CircularProgress, Container, Typography } from '@mui/material';
import useFetchMovies from '../hooks/useFetchMovies';
import MovieCard from '../molecules/MovieCard';
import ScrollToTopButton from '../molecules/ScrollToTopButton.tsx';
import { styled } from '@mui/material/styles';
import { colors } from '../utils/constant.ts';

/**
 * TrendyMovies Component
 * This functional component displays a list of trendy movies. It uses the custom hook `useFetchMovies`
 * to fetch the movie data from an API. It displays a loading spinner while fetching the data, an error,
 * or there is data available, the MovieCard component is rendered for each movie in the list.
 * It also scrolls the window to the top when the component mounts.
 * @returns JSX.Element - The rendered component.
 */
const TrendyMovies: FC = () => {
  const { data, loading, error } = useFetchMovies();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <CenterContainer>
        <CircularProgress />
      </CenterContainer>
    );
  }

  if (error) {
    return (
      <CenterContainer>
        <Alert severity="error">{error}</Alert>
      </CenterContainer>
    );
  }

  if (!data) {
    return <CenterContainer>{content.noData}</CenterContainer>;
  }

  return (
    <StyledContainer maxWidth={false}>
      <ScrollToTopButton />
      <Title variant="h3" gutterBottom>
        {content.title}
      </Title>
      <MovieListContainer>
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieListContainer>
    </StyledContainer>
  );
};

export default TrendyMovies;

const content = {
  noData: 'No data available',
  title: 'Trendy Movie List',
};

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled(Typography)(
  ({ theme }) => `
  position: relative;
  font-family: 'Mulish', sans-serif;
  font-size: 3rem;
  font-weight: bold;
  color: ${theme.palette.text.primary};
  text-align: center;
  margin-bottom: 20px;

  &:before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 5px;
    background-color: ${theme.palette.primary.main};
  }

  ${theme.breakpoints.down('sm')} {
    font-size: 2rem;
    &:before {
      width: 100px;
    }
  }
`,
);

const MovieListContainer = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  ${theme.breakpoints.down('sm')} {
    flex-direction: column;
    align-items: center;
  }
`,
);

const CenterContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
