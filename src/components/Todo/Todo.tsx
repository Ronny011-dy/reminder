import { useState } from 'react';

import type { Reminder } from './Todo.types';
import { Root, ChildReminder, AlignedStack, Padding } from './Todo.styles';
import { Tags } from './components/Tags/Tags';

import { TextInput } from './components/TextInput/TextInput';
import { ReminderOptions } from './components/ReminderOptions/ReminderOptions';
import { DoneProvider } from './components/DoneProvider/DoneProvider';

import { Checkbox, ListItem, ListItemIcon, Stack } from '@mui/material';
import { useQueryClientAndMutation } from '../../hooks/useQueryClientAndMutation';
import { updateReminderDB } from '../../api/functions.api';
import { useReminderIdContext } from '../ReminderWrapper/hooks/useReminderIdContext';
import { useRemindersDataContext } from '../ReminderWrapper/hooks/useRemindersDataContext';
import { ReminderList } from '../ReminderWrapper/components/ReminderList/ReminderList';

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
  const allData = useRemindersDataContext();
  const subData = allData.filter((reminder) => reminder.parentID === id);

  const doneHandler = () => {
    subReminders &&
      subReminders.map((sub) =>
        mutation.mutate({ id: sub, req: { done: !done } })
      );
    mutation.mutate({ id, req: { done: !done } });
  };
  return (
    <Root isChild={parentID !== null}>
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
            <AlignedStack direction="row">
              <ListItemIcon>
                <Checkbox checked={done} onClick={doneHandler} />
              </ListItemIcon>
              <TextInput title={title} placeholder="Enter reminder" />
              <Tags date={date} tags={tags} />
            </AlignedStack>
            <TextInput title={description} secondary placeholder="•••" />
          </Stack>
        </ListItem>
        {subData.length > 0 && <Padding />}
        {subData.length > 0 && (
          <ChildReminder>
            <ReminderList data={subData} />
          </ChildReminder>
        )}
      </DoneProvider>
    </Root>
  );
};

export { Todo };
