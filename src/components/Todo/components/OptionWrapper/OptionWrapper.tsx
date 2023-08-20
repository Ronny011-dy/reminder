import { ReactNode } from 'react';

import { Tooltip, IconButton } from '@mui/material';

type OptionWrapperProps = {
  title: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const OptionWrapper: React.FC<OptionWrapperProps> = ({ children, title, onClick, disabled }) => {
  return (
    <Tooltip
      title={title}
      enterDelay={650}
      enterNextDelay={650}
    >
      <IconButton
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

export { OptionWrapper };
