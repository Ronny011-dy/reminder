import { Outlet } from 'react-router-dom';

import { Root } from './App.styles';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { useTheme } from '@mui/material';

const App: React.FC = () => {
  const theme = useTheme();
  return (
    <Root theme={theme}>
      <Header />
      <Outlet />
      <Footer />
    </Root>
  );
};

export { App };
