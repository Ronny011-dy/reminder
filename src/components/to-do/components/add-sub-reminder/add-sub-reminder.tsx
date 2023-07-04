import React from 'react';
import { OptionWrapper } from '../option-wrapper/option-wrapper';

import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';
import { addNewReminderDB } from '../../../../api/functions.api';
import { useReminderIdContext } from '../../../../hooks/useReminderIdContext';

const AddSubReminder: React.FC = () => {
  const id = useReminderIdContext();
  // create a reminder and assign it with a parentID
  const mutation = useQueryClientAndMutation(addNewReminderDB, 'Create', true);

  const subAddhandler = () => {
    mutation.mutate({ id });
  };
  return (
    <OptionWrapper title="Add sub-reminder" onClick={subAddhandler}>
      <ChecklistRoundedIcon className="add-sub-reminder" />
    </OptionWrapper>
  );
};

export { AddSubReminder };
