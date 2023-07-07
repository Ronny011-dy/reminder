import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { addNewReminderDB } from '../../../../api/functions.api';
import { Root } from './create-reminder.styles';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';

import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CreateReminder: React.FC = () => {
  const mutation = useQueryClientAndMutation(addNewReminderDB, 'Create');

  return (
    <Root>
      <IconButton
        className="add"
        disableRipple
        onClick={() => mutation.mutate({ id: uuidv4() })}
      >
        {' '}
        <AddIcon className="plus" />
      </IconButton>
    </Root>
  );
};

export { CreateReminder };
