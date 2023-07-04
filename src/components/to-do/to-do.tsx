import React, { useState } from 'react';

import type { Reminder } from './types';
import { Root } from './to-do.styles';
import { Tags } from './components/tags/tags';

import { TextInput } from './components/text-input/text-input';
import { ReminderOptions } from './components/reminder-options/reminder-options';
import { DoneProvider } from './components/done-provider/done-provider';

import { ListItem, ListItemIcon, Radio, Stack } from '@mui/material';
import { useQueryClientAndMutation } from '../../hooks/useQueryClientAndMutation';
import { updateReminderDB } from '../../api/functions.api';
import { useReminderIdContext } from '../../hooks/useReminderIdContext';

const boolToNumber = (bool: boolean): number => {
  return bool ? 1 : 0;
};

const Todo: React.FC<Reminder> = ({
  done,
  title,
  description,
  tags,
  createdDate,
  date,
  important,
}) => {
  const mutation = useQueryClientAndMutation(updateReminderDB, 'Update');
  const id = useReminderIdContext();
  const [isDone, setIsDone] = useState(done);

  const doneHandler = () => {
    mutation.mutate({ id, req: { done: boolToNumber(!isDone) } });
    setIsDone(!isDone);
  };
  return (
    <Root>
      <DoneProvider done={isDone}>
        <ListItem
          disablePadding
          secondaryAction={<ReminderOptions important={important} />}
        >
          <Stack direction="column">
            <Stack direction="row" className="row">
              <ListItemIcon>
                <Radio checked={isDone} onClick={doneHandler} />
              </ListItemIcon>
              <TextInput title={title} placeholder="Enter reminder" />
              <Tags date={date} tags={tags} />
            </Stack>
            <div className="description-wrapper row">
              <div className="padding" />
              <TextInput title={description} secondary placeholder="•••" />
            </div>
          </Stack>
        </ListItem>
      </DoneProvider>
    </Root>
  );
};

export { Todo };
