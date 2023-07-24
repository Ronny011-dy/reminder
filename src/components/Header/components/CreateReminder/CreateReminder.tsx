import React from 'react';

import { Root, IconWrapper } from './CreateReminder.styles.ts';

import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type CreateReminderProps = {
  onCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateReminder: React.FC<CreateReminderProps> = ({ onCreate }) => {
  return (
    <Root>
      reminder
      <IconWrapper>
        <IconButton disableRipple onClick={() => onCreate(true)}>
          <AddIcon />
        </IconButton>
      </IconWrapper>
    </Root>
  );
};

export { CreateReminder };
