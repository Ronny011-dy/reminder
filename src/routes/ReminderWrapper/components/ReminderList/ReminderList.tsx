import { IdProvider } from '../IdProvider/IdProvider';
import { Todo } from '../../../../components/Todo/Todo';
import { DBReminder } from '../../ReminderWrapper.types';

import { ClickAwayListener, List } from '@mui/material';
import { useState } from 'react';

type ReminderListProps = {
  data?: DBReminder[];
  isChild: boolean;
  parentID?: string;
};

const ReminderList: React.FC<ReminderListProps> = ({
  data,
  isChild,
  parentID,
}) => {
  const reminders = isChild
    ? data
    : data?.filter((reminder) => reminder.parentID === null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleReminderClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const handleClickAway = () => setSelectedIndex(-1);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <List disablePadding>
        {reminders &&
          reminders.map((reminder, i) => {
            return (
              <IdProvider id={reminder.id} key={reminder.id}>
                <Todo
                  done={Boolean(reminder.done)}
                  title={reminder.title}
                  description={reminder.description}
                  tags={JSON.parse(reminder.tags)}
                  createdDate={Number(reminder.createdDate)}
                  date={
                    reminder.date === null ? undefined : Number(reminder.date)
                  }
                  important={reminder.important}
                  parentID={reminder.parentID}
                  i={i}
                  onClick={handleReminderClick}
                  selectedIndex={selectedIndex}
                  childrenReminders={
                    isChild
                      ? undefined
                      : data?.filter(
                          (reminder) => reminder.parentID === parentID
                        )
                  }
                />
              </IdProvider>
            );
          })}
      </List>
    </ClickAwayListener>
  );
};

export { ReminderList };
