import { useMemo, ReactNode, createContext } from 'react';
import { useMediaQuery, CssBaseline, PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type ThemeProps = {
  children: ReactNode;
};

// context type
type ContextParams = {
  toggleColorMode: () => void;
  toggleOverride: () => void;
  getOverrideStatus: () => boolean;
  getThemePreference: () => string;
};

// theme type

const ColorModeContext = createContext<ContextParams | undefined>(undefined);

const Theme: React.FC<ThemeProps> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [preferenceLocalStorageValue, setPreferenceLocalStorageValue] = useLocalStorage<PaletteMode>(
    'reminders_Theme_Preference',
    'dark'
  );
  const [overrideLocalStorageValue, setOverrideLocalStorageValue] = useLocalStorage(
    'reminders_OS_Theme_Override',
    false
  );
  const colorMode = {
    toggleColorMode: () => {
      setPreferenceLocalStorageValue((prev) => (prev === 'light' ? 'dark' : 'light'));
    },
    toggleOverride: () => {
      setOverrideLocalStorageValue((prev) => !prev);
    },
    getOverrideStatus: () => {
      return overrideLocalStorageValue;
    },
    getThemePreference: () => {
      return preferenceLocalStorageValue;
    }
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          // mode: preferenceLocalStorageValue,
          mode: overrideLocalStorageValue ? preferenceLocalStorageValue : prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#0059e6'
          },
          secondary: {
            main: '#00388e'
          },
          common: {
            black: 'rgb(30,30,30)',
            white: 'whitesmoke'
          }
        }
      }),
    [prefersDarkMode, overrideLocalStorageValue, preferenceLocalStorageValue]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { Theme, ColorModeContext };
