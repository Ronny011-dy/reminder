import React from 'react';

import type { Reminder } from './types';
import { Root } from './to-do.styles';
import { Tags } from './components/tags/tags';

import { TextInput } from './components/text-input/text-input';

import { ReminderOptions } from './components/reminder-options/reminder-options';

import { ListItem, ListItemIcon, Radio, Stack } from '@mui/material';

const Todo: React.FC<Reminder> = ({
  done,
  title,
  description,
  tags,
  createdDate,
  date,
  important,
}) => {
  return (
    <Root>
      <ListItem
        disablePadding
        secondaryAction={<ReminderOptions important={important} done={done} />}
      >
        <Stack direction="column">
          <Stack direction="row" className="row">
            <ListItemIcon>
              <Radio checked={done} onChange={() => console.log('done')} />
            </ListItemIcon>
            <TextInput title={title} placeholder="Enter reminder" done={done} />
            <Tags date={date} tags={tags} done={done} />
          </Stack>
          <div className="description-wrapper row">
            <div className="padding" />
            <TextInput
              title={description}
              secondary
              placeholder="•••"
              done={done}
            />
          </div>
        </Stack>
      </ListItem>
    </Root>
  );
};

export { Todo };
