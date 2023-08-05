import { ReactNode } from 'react';
import { Root } from './HeaderButton.styles';

type HeaderButtonProps = {
  children: ReactNode;
  onClick?: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderButton: React.FC<HeaderButtonProps> = ({ children, onClick }) => {
  return <Root onClick={() => onClick && onClick(true)}>{children}</Root>;
};

export { HeaderButton };
