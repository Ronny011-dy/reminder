import { useTheme } from '@mui/material';
import { Root } from './Footer.styles';

const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    <Root theme={theme}>
      <div>Created by Ronny Paz 2023</div>
    </Root>
  );
};

export { Footer };
