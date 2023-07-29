import { ReactNode } from 'react';

import { Tooltip, IconButton } from '@mui/material';

import { useReminderDoneContext } from '../../hooks/useReminderDoneContext';

type OptionWrapperProps = {
  title: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const OptionWrapper: React.FC<OptionWrapperProps> = ({
  children,
  title,
  onClick,
  disabled,
}) => {
  const done = useReminderDoneContext();

  return (
    <Tooltip title={title} enterDelay={650} enterNextDelay={650}>
      <IconButton onClick={onClick} disabled={disabled}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export { OptionWrapper };
