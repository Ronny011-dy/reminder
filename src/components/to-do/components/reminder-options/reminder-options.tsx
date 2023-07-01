import React from 'react';

import { ButtonGroup } from '@mui/material';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';

import { OptionWrapper } from '../option-wrapper/option-wrapper';
import { DeleteReminder } from '../delete-reminder/delete-reminder';
import { ImportantToggle } from '../important-toggle/important-toggle';

type ReminderOptionsProps = {
  important: boolean;
  done?: boolean;
};

const ReminderOptions: React.FC<ReminderOptionsProps> = ({
  important,
  done,
}) => {
  return (
    <ButtonGroup>
      <ImportantToggle important={important} />
      <OptionWrapper title="Add sub-reminder" done={done}>
        <ChecklistRoundedIcon className="add-sub-reminder" />
      </OptionWrapper>
      <DeleteReminder />
    </ButtonGroup>
  );
};

export { ReminderOptions };
