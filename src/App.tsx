import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './utils/theme.ts';
import Navigation from './organisms/Navigation.tsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
