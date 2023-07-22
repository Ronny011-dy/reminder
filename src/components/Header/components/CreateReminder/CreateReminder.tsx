import React from 'react';

import { Root, IconWrapper } from './CreateReminder.styles.ts';

import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CreateReminder: React.FC = () => {
  return (
    <Root>
      reminder
      <IconWrapper>
        <IconButton disableRipple onClick={() => console.log()}>
          <AddIcon />
        </IconButton>
      </IconWrapper>
    </Root>
  );
};

export { CreateReminder };
