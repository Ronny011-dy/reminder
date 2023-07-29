import { useTheme } from '@mui/material';
import { Root } from './Footer.styles';

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  const theme = useTheme();
  return (
    <Root theme={theme}>
      <div>Created by Ronny Paz 2023</div>
    </Root>
  );
};

export { Footer };
