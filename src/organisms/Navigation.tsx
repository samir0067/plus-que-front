import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import { colors } from '../utils/constant.ts';
import MovieDetails from '../pages/MovieDetails.tsx';
import NotFound from '../pages/NotFound.tsx';
import TrendyMovies from '../pages/TrendyMovies.tsx';

const Navigation: FC = () => {
  const theme = useTheme();

  return (
    <BrowserRouter>
      <MainBox theme={theme} component="main">
        <Routes>
          <Route path="/" element={<TrendyMovies />} />
          <Route path="/movie" element={<MovieDetails />} />
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
