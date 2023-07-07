import { ReactNode } from 'react';

import { Tooltip, IconButton } from '@mui/material';

import { useReminderDoneContext } from '../../../../hooks/useReminderDoneContext';

type OptionWrapperProps = {
  title: string;
  children?: ReactNode;
  onClick?: () => void;
  dontDisable?: boolean;
};

const OptionWrapper: React.FC<OptionWrapperProps> = ({
  children,
  title,
  onClick,
  dontDisable,
}) => {
  const done = useReminderDoneContext();
  done && console.log('The tolltip being disabled is intended behavior');

  return (
    <Tooltip title={title} enterDelay={650} enterNextDelay={650}>
      <IconButton onClick={onClick} disabled={dontDisable ? false : done}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export { OptionWrapper };
