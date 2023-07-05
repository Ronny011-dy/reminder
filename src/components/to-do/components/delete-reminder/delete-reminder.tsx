import React from 'react';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { OptionWrapper } from '../option-wrapper/option-wrapper';
import { deleteReminderDB } from '../../../../api/functions.api';
import { useReminderIdContext } from '../../../../hooks/useReminderIdContext';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';

type DeleteReminderProps = {
  subReminders?: string[];
};

const DeleteReminder: React.FC<DeleteReminderProps> = ({ subReminders }) => {
  const id = useReminderIdContext();
  const mutation = useQueryClientAndMutation(deleteReminderDB, 'Delete', true);

  const deletehandler = () => {
    // first delete sub reminders
    subReminders && subReminders.map((sub) => mutation.mutate({ id: sub }));
    mutation.mutate({ id });
  };

  return (
    <OptionWrapper title="Delete reminder" onClick={deletehandler} dontDisable>
      <DeleteRoundedIcon className="delete-reminder" />
    </OptionWrapper>
  );
};

export { DeleteReminder };
