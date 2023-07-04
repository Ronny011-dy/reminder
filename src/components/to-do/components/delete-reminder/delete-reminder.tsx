import React from 'react';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { OptionWrapper } from '../option-wrapper/option-wrapper';
import { deleteReminderDB } from '../../../../api/functions.api';
import { useReminderIdContext } from '../../../../hooks/useReminderIdContext';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';

const DeleteReminder: React.FC = () => {
  const id = useReminderIdContext();
  const mutation = useQueryClientAndMutation(deleteReminderDB, 'Delete', true);

  return (
    <OptionWrapper
      title="Delete reminder"
      onClick={() => mutation.mutate({ id })}
      dontDisable
    >
      <DeleteRoundedIcon className="delete-reminder" />
    </OptionWrapper>
  );
};

export { DeleteReminder };
