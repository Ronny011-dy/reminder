import { useState } from 'react';

import type { Reminder } from './types';
import { Root, ChildReminders, Inset, AlignedStack } from './to-do.styles';
import { Tags } from './components/tags/tags';

import { TextInput } from './components/text-input/text-input';
import { ReminderOptions } from './components/reminder-options/reminder-options';
import { DoneProvider } from './components/done-provider/done-provider';
import { ReminderList } from '../reminder-wrapper/components/reminder-list/reminder-list';

import { ListItem, ListItemIcon, Radio, Stack } from '@mui/material';
import { useQueryClientAndMutation } from '../../hooks/useQueryClientAndMutation';
import { updateReminderDB } from '../../api/functions.api';
import { useReminderIdContext } from '../reminder-wrapper/hooks/useReminderIdContext';
import { useRemindersDataContext } from '../reminder-wrapper/hooks/useRemindersDataContext';

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
  const allData = useRemindersDataContext();
  const subData = allData.filter((reminder) => reminder.parentId === id);

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
            <AlignedStack direction="row">
              <ListItemIcon>
                <Radio checked={done} onClick={doneHandler} />
              </ListItemIcon>
              <TextInput title={title} placeholder="Enter reminder" />
              <Tags date={date} tags={tags} />
            </AlignedStack>
            <div className="description-wrapper row">
              <Inset />
              <TextInput title={description} secondary placeholder="•••" />
            </div>
          </Stack>
        </ListItem>
        {subData.length > 0 && (
          <ChildReminders>
            <ReminderList data={subData} />
          </ChildReminders>
        )}
      </DoneProvider>
    </Root>
  );
};

export { Todo };
