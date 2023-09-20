import { ReactNode } from 'react';

import { IconButton } from '@mui/material';
import { ArrowTooltip } from '../../../ArrowTooltip/ArrowTooltip';

type OptionWrapperProps = {
  title: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const OptionWrapper: React.FC<OptionWrapperProps> = ({ children, title, onClick, disabled }) => {
  return (
    <ArrowTooltip title={title}>
      <>
        <IconButton
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </IconButton>
      </>
    </ArrowTooltip>
  );
};

export { OptionWrapper };
