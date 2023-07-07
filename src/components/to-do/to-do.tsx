import { useState } from 'react';

import type { Reminder } from './types';
import { Root } from './to-do.styles';
import { Tags } from './components/tags/tags';

import { TextInput } from './components/text-input/text-input';
import { ReminderOptions } from './components/reminder-options/reminder-options';
import { DoneProvider } from './components/done-provider/done-provider';
import { ReminderList } from '../reminder-wrapper/components/reminder-list/reminder-list';

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
  parentID,
}) => {
  const [subReminders, setSubReminders] = useState<string[]>([]);
  const mutation = useQueryClientAndMutation(updateReminderDB, 'Update');
  const id = useReminderIdContext();

  const doneHandler = () => {
    subReminders &&
      subReminders.map((sub) =>
        mutation.mutate({ id: sub, req: { done: boolToNumber(!done) } })
      );
    mutation.mutate({ id, req: { done: boolToNumber(!done) } });
  };
  return (
    <Root>
      <DoneProvider done={done}>
        <ListItem
          disablePadding
          secondaryAction={
            <ReminderOptions
              important={important}
              subState={subReminders}
              subSetter={setSubReminders}
              isChild={parentID !== null}
            />
          }
        >
          <Stack direction="column">
            <Stack direction="row" className="row">
              <ListItemIcon>
                <Radio checked={done} onClick={doneHandler} />
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
        {/* //TODO Add a recursive call to the reminders list to render all children under the parent reminder*/}
        {/* //TODO: Use parentID to ID comparison, existing providers and styped components styling like a prop for RemindersList or a wrapper in the current component */}
        {/* <ReminderList/> */}
      </DoneProvider>
    </Root>
  );
};

export { Todo };
