import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import { colors } from '../utils/constant.ts';
import MovieDetails from '../pages/MovieDetails.tsx';
import NotFound from '../pages/NotFound.tsx';
import TrendyMovies from '../pages/TrendyMovies.tsx';
import DrawerAppBar from './DrawerAppBar.tsx';

/**
 * This Navigation functional Component sets up the routing for the application using React Router.
 * It includes routes for the home page, movie details page, and a not found page.
 * It uses Material-UI for styling and layout.
 * @returns JSX.Element - The rendered component.
 */
const Navigation: FC = () => {
  const theme = useTheme();

  return (
    <BrowserRouter>
      <DrawerAppBar />
      <MainBox theme={theme} component="main">
        <Routes>
          <Route path="/" element={<TrendyMovies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainBox>
    </BrowserRouter>
  );
};

export default Navigation;

const MainBox = styled(Box)`
  background-color: ${colors.white};
  min-height: 100vh;
  width: 100%;
  margin-top: 60px;
`;
