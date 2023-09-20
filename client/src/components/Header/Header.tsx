import { useTheme } from '@mui/material';
import { Root, Title } from './Header.styles';
import { OtherOptions } from './components/OtherOptions/OtherOptions';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <Root theme={theme}>
      <div>
        <Link to={'/'}>
          <Title theme={theme}>reminder</Title>
        </Link>
        <OtherOptions />
      </div>
    </Root>
  );
};

export { Header };
