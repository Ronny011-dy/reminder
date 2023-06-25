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
  return (
    <Tooltip title={title} followCursor enterDelay={650} leaveDelay={200}>
      <IconButton onClick={onClick} disabled={done}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export { OptionWrapper };
