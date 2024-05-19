import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  FormControlLabel,
  Pagination,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import useFetchMovies from '../hooks/useFetchMovies';
import MovieCard from '../molecules/MovieCard';
import ScrollToTopButton from '../molecules/ScrollToTopButton.tsx';
import { styled } from '@mui/material/styles';
import CustomButton from '../atoms/CustomButton.tsx';

/**
 * TrendyMovies Component
 * This functional component displays a list of trendy movies. It uses the custom hook `useFetchMovies`
 * to fetch the movie data from an API. It displays a loading spinner while fetching the data, an error,
 * or there is data available, the MovieCard component is rendered for each movie in the list.
 * The component also has a toggle switch to switch between daily and weekly trending movies.
 * It also has a search input to search for movies by name.
 * It also scrolls the window to the top when the component mounts.
 * @returns JSX.Element - The rendered component.
 */
const TrendyMovies: FC = () => {
  const [period, setPeriod] = useState<'day' | 'week'>('day');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const { data, loading, error } = useFetchMovies(period, page, submittedQuery);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleToggle = () => {
    setPeriod((prev) => (prev === 'day' ? 'week' : 'day'));
  };

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSubmittedQuery(searchQuery);
    setPage(1);
  };

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
      <FormControlLabel
        label={`${content.view} ${period === 'day' ? 'day' : 'week'}${content.trendingMovies}`}
        control={<Switch checked={period === 'week'} onChange={handleToggle} color="primary" />}
      />
      <SearchContainer>
        <TextField
          label={content.labelSearch}
          variant="outlined"
          fullWidth
          value={searchQuery}
          sx={{ borderRadius: '20px' }}
          onChange={handleSearchChange}
        />
        <CustomButton label={content.btnSearch} onClick={handleSearchSubmit} />
      </SearchContainer>
      <MovieListContainer>
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieListContainer>
      <PaginationContainer>
        <Pagination count={data.total_pages} page={page} onChange={handlePageChange}
                    color="primary" />
      </PaginationContainer>
    </StyledContainer>
  );
};

export default TrendyMovies;

const content = {
  noData: 'No data available',
  title: 'Trendy Movie List',
  view: 'View the',
  trendingMovies: "'s trending movies",
  btnSearch: 'Search',
  labelSearch: 'Search movie',
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

const PaginationContainer = styled(Box)`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const SearchContainer = styled(Box)`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 600px;
`;
