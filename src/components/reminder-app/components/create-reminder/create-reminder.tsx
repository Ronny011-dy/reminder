import React from 'react';

import { addNewReminderDB } from '../../../../api/functions.api';
import { Root } from './create-reminder.styles';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';

import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CreateReminder: React.FC = () => {
  const mutation = useQueryClientAndMutation(addNewReminderDB, 'Create', true);

  return (
    <Root>
      <IconButton
        className="add"
        disableRipple
        onClick={() => mutation.mutate({})}
      >
        {' '}
        <AddIcon className="plus" />
      </IconButton>
    </Root>
  );
};

export { CreateReminder };
