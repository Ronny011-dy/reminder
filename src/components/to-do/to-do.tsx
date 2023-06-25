import React from 'react';

import type { Reminder } from './types';
import { Root } from './to-do.styles';
import { Tags } from './components/tags/tags';

import { TextInput } from './components/text-input/text-input';

import { ReminderOptions } from './components/reminder-options/reminder-options';

import { ListItem, ListItemIcon, Radio } from '@mui/material';

const Todo: React.FC<Reminder> = ({
  done,
  title,
  description,
  tags,
  createdDate,
  date,
  important,
}) => {
  const reminderDeleteHandler = () => {
    // props.deleteHandler(props.id);
  };

  const reminderCompleteHandler = () => {
    // props.done || props.completeHandler(props.id);
  };

  return (
    <Root>
      <ListItem
        disablePadding
        secondaryAction={<ReminderOptions important={important} done={done} />}
      >
        <ListItemIcon>
          <Radio checked={done} onChange={reminderCompleteHandler} />
        </ListItemIcon>
        <TextInput
          title={title}
          isTag
          placeholder="Enter reminder"
          done={done}
        />
        <TextInput
          title={description}
          secondary
          isTag
          placeholder="Enter description"
          done={done}
        />
        <Tags date={date} tags={tags} done={done} />
      </ListItem>
    </Root>
  );
};

export { Todo };
