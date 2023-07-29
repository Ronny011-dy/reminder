import { useMemo, ReactNode } from 'react';
import { useMediaQuery, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';

// export const themeOptions: ThemeOptions = {
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#0216f1',
//     },
//     secondary: {
//       main: '#f8eb00',
//     },
//   },
// };

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
          primary: {
            main: '#0059e6',
          },
          secondary: {
            main: '#00388e',
          },
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
