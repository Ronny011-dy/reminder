import { ReactNode } from 'react';
import { Root } from './HeaderButton.styles';
import { useTheme } from '@mui/material';

interface HeaderButtonProps {
  children: ReactNode;
  // also used in subheader, where onClick is needed. Not needed for routing
  onClick?: React.Dispatch<React.SetStateAction<boolean>>;
  nonheader?: boolean;
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ children, onClick, nonheader }) => {
  const theme = useTheme();
  return (
    <Root
      theme={theme}
      $nonheader={nonheader}
      onClick={() => onClick && onClick(true)}
    >
      {children}
    </Root>
  );
};
