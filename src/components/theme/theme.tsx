import { useMemo, ReactNode } from 'react';
import { useMediaQuery, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type ThemeProps = {
  children: ReactNode;
};

const Theme: React.FC<ThemeProps> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
};

export { Theme };
