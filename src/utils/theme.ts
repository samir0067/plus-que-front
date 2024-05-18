import { createTheme } from '@mui/material';
import { colors } from './constant.ts';

export const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontFamily: 'Mulish, sans-serif',
    },
  },
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    text: {
      primary: colors.black,
      secondary: colors.white,
      disabled: colors.gray,
    },
  },
});
