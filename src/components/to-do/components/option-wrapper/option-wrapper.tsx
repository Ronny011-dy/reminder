import React from 'react';
import { ReactNode } from 'react';

import { Tooltip, IconButton } from '@mui/material';

type OptionWrapperProps = {
  title: string;
  children?: ReactNode;
  onClick?: () => void;
  done?: boolean;
};

const OptionWrapper: React.FC<OptionWrapperProps> = ({
  children,
  title,
  onClick,
  done,
}) => {
  done &&
    console.log('The tolltip being disabled is actually intended behavior');

  return (
    <Tooltip title={title} enterDelay={650} enterNextDelay={650}>
      <IconButton onClick={onClick} disabled={done}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export { OptionWrapper };
