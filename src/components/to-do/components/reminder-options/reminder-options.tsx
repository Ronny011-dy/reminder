import React from 'react';

import { IconButton, Tooltip, ButtonGroup } from '@mui/material';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { OptionWrapper } from '../option-wrapper/option-wrapper';

type ReminderOptionsProps = {
  important?: boolean;
  done?: boolean;
};

const ReminderOptions: React.FC<ReminderOptionsProps> = ({
  important,
  done,
}) => {
  return (
    <ButtonGroup>
      <OptionWrapper
        title={important ? 'Unmark as important' : 'Mark as important'}
        done={done}
      >
        {important ? (
          <ErrorRoundedIcon />
        ) : (
          <ErrorOutlineRoundedIcon className="secondary" />
        )}
      </OptionWrapper>
      <OptionWrapper title="Add sub-reminder" done={done}>
        <ChecklistRoundedIcon className="add-sub-reminder" />
      </OptionWrapper>
      <OptionWrapper title="Delete reminder">
        <DeleteRoundedIcon className="delete-reminder" />
      </OptionWrapper>
    </ButtonGroup>
  );
};

export { ReminderOptions };
