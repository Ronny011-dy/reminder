import { Root } from './ReminderList.styles';
import { IdProvider } from '../IdProvider/IdProvider';
import { Todo } from '../../../../components/Todo/Todo';
import { DBReminder } from '../../ReminderWrapper.types';

import { ClickAwayListener, List } from '@mui/material';
import { useState } from 'react';

interface ReminderListProps {
  data?: DBReminder[];
  isChild: boolean;
  parentID?: string;
  numOfReminders?: number;
  lastElementRef?: (element: any) => void;
}

const ReminderList: React.FC<ReminderListProps> = ({ data, isChild, parentID, numOfReminders, lastElementRef }) => {
  // if reminders marked as isChild return all children, else render out only parent reminders
  const reminders = isChild ? data : data?.filter((reminder) => reminder.parentID === null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleReminderClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  const handleClickAway = () => setSelectedIndex(-1);

  return (
    <Root>
      {/* unselects any selected reminder on clickaway of entire list */}
      <ClickAwayListener onClickAway={handleClickAway}>
        <List disablePadding>
          {reminders?.map((reminder, i) => {
            const { tags, createdDate, date, ...otherReminderProps } = reminder;
            if (i === numOfReminders)
              return (
                <IdProvider
                  id={reminder.id}
                  key={reminder.id}
                >
                  <Todo
                    // if this is the last reminder from the ones that were rendered, send a ref...
                    // ... which will trigger loading of more reminders
                    lastElementRef={lastElementRef}
                    {...otherReminderProps}
                    tags={JSON.parse(reminder.tags)}
                    createdDate={Number(reminder.createdDate)}
                    date={reminder.date === null ? undefined : Number(reminder.date)}
                    reminderIndex={i}
                    onClick={handleReminderClick}
                    selectedIndex={selectedIndex}
                    childrenReminders={isChild ? undefined : data?.filter((reminder) => reminder.parentID === parentID)}
                  />
                </IdProvider>
              );
            else
              return (
                <IdProvider
                  id={reminder.id}
                  key={reminder.id}
                >
                  <Todo
                    {...otherReminderProps}
                    tags={JSON.parse(reminder.tags)}
                    createdDate={Number(reminder.createdDate)}
                    date={reminder.date === null ? undefined : Number(reminder.date)}
                    reminderIndex={i}
                    onClick={handleReminderClick}
                    selectedIndex={selectedIndex}
                    childrenReminders={isChild ? undefined : data?.filter((reminder) => reminder.parentID === parentID)}
                  />
                </IdProvider>
              );
          })}
        </List>
      </ClickAwayListener>
    </Root>
  );
};

export { ReminderList };
