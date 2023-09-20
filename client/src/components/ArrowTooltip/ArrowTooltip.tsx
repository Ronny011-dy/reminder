import { Tooltip } from '@mui/material';
import { ReactElement } from 'react';

type ArrowTooltipProps = {
  title: string;
  children: ReactElement;
};

export const ArrowTooltip: React.FC<ArrowTooltipProps> = ({ title, children }) => {
  return (
    <Tooltip
      title={title}
      enterDelay={650}
      enterNextDelay={650}
      arrow
    >
      {children}
    </Tooltip>
  );
};
