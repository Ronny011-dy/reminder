import React from 'react';

import { ButtonGroup } from '@mui/material';

import { DeleteReminder } from '../delete-reminder/delete-reminder';
import { ImportantToggle } from '../important-toggle/important-toggle';
import { useReminderDoneContext } from '../../../../hooks/useReminderDoneContext';
import { AddSubReminder } from '../add-sub-reminder/add-sub-reminder';

type ReminderOptionsProps = {
  important: boolean;
};

const ReminderOptions: React.FC<ReminderOptionsProps> = ({ important }) => {
  return (
    <ButtonGroup>
      <ImportantToggle important={important} />
      <AddSubReminder />
      <DeleteReminder />
    </ButtonGroup>
  );
};

export { ReminderOptions };
