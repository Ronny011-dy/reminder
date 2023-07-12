import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { addNewReminderDB } from '../../../../api/functions.api';
import { Root } from './CreateReminder.styles';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';

import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CreateReminder: React.FC = () => {
  const mutation = useQueryClientAndMutation(addNewReminderDB, 'Create');

  return (
    <Root>
      <IconButton
        disableRipple
        onClick={() => mutation.mutate({ id: uuidv4() })}
      >
        <AddIcon />
      </IconButton>
    </Root>
  );
};

export { CreateReminder };
