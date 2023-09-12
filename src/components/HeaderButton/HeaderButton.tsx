import { ReactNode } from 'react';
import { Root, StyledWrapper } from './HeaderButton.styles';

interface HeaderButtonProps {
  children: ReactNode;
  // also used in subheader, where onClick is needed. Not needed for routing
  onClick?: React.Dispatch<React.SetStateAction<boolean>>;
  nonheader?: boolean;
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ children, onClick, nonheader }) => {
  return (
    <Root
      $nonheader={nonheader}
      onClick={() => onClick && onClick(true)}
      disableRipple
    >
      <StyledWrapper $nonheader={nonheader}>{children}</StyledWrapper>
    </Root>
  );
};
