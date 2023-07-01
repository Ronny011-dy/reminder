import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { addNewReminderDB } from '../../../../api/functions.api';
import { Root } from './create-reminder.styles';
import { ActionType } from '../../../toast-wrapper/types';
import { useToastContext } from '../../../hooks/useToastContext';

import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// created mainly because the mutation hook cannot be wrapped in a function, only a component
//TODO: mutation.mutate can be wrapped into a function
//* CreateReminder and Toast living together would really simplify the code
//? Have the App hold all of the API functionality and split the rest into sub components
const CreateReminder: React.FC = () => {
  const { dispatch } = useToastContext();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addNewReminderDB,
    onSuccess: () => {
      dispatch({ type: ActionType.Create });
      queryClient.invalidateQueries(['reminders']);
    },
    onError: () => {
      dispatch({ type: ActionType.ErrorCreating });
    },
  });

  return (
    <Root>
      <IconButton
        className="add"
        disableRipple
        onClick={() => mutation.mutate()}
      >
        {' '}
        <AddIcon className="plus" />
      </IconButton>
    </Root>
  );
};

export { CreateReminder };
