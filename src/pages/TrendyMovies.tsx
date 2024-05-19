import { FC } from 'react';
import { Alert, Box, CircularProgress, Container, Typography } from '@mui/material';
import useFetchMovies from '../hooks/useFetchMovies.tsx';
import MovieCard from '../molecules/MovieCard.tsx';
import { styled } from '@mui/material/styles';

const TrendyMovies: FC = () => {
  const { data, loading, error } = useFetchMovies();

  if (loading) {
    return <LoadingContainer><CircularProgress /></LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer><Alert severity="error">{error}</Alert></ErrorContainer>;
  }

  if (!data) {
    return <ErrorContainer>No data available</ErrorContainer>;
  }

  return (
    <StyledContainer maxWidth={false}>
      <Title variant="h3" gutterBottom>
        Movie List
      </Title>
      <MovieListContainer>
        {data.results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieListContainer>
    </StyledContainer>
  );
};

export default TrendyMovies;

const StyledContainer = styled(Container)(({ theme }) => `
  display: flex;
  background-color: ${theme.palette.background.default};
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${theme.palette.background.default};
`);

const Title = styled(Typography)(({ theme }) => `
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
`);

const MovieListContainer = styled(Box)(({ theme }) => `
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  ${theme.breakpoints.down('sm')} {
    flex-direction: column;
    align-items: center;
  }
`);

const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ErrorContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
