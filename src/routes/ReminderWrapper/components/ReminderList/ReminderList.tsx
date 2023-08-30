import { ClickAwayListener } from '@mui/material';
import { Fragment, useState } from 'react';

import { Root } from './ReminderList.styles';
import { CurrentReminderProvider } from '../CurrentReminderProvider/CurrentReminderProvider';
import { Todo } from '../../../../components/Todo/Todo';
import { DbReminder } from '../../ReminderWrapper.types';
import { paginationPageLength } from '../../../../common/values';
import { Droppable } from '@hello-pangea/dnd';
import { DroppableList } from '../DroppableList/DroppableList';

interface ReminderListProps {
  data?: DbReminder[];
  isChild: boolean;
  parentID?: string;
  numOfReminders?: number;
  lastElementRef?: (element: any) => void;
}

export const ReminderList: React.FC<ReminderListProps> = ({
  data,
  isChild,
  parentID,
  numOfReminders,
  lastElementRef
}) => {
  // if reminders marked as isChild return all children, else render out only parent reminders
  const reminders = isChild ? data : data?.filter((reminder) => reminder.parentID === null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleReminderClick = (_: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  const handleClickAway = () => setSelectedIndex(-1);
  return (
    <Droppable droppableId={`${isChild ? 'child' : 'parent'}`}>
      {(provided) => (
        <Root>
          {/* unselects any selected reminder on clickaway of entire list */}
          <ClickAwayListener onClickAway={handleClickAway}>
            <>
              <DroppableList
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                {reminders?.map((reminder, i) => {
                  const { tags, createdDate, date, parentID: reminderParentID, ...otherReminderProps } = reminder;
                  const convertedProps = {
                    parentID: reminderParentID ? reminderParentID : undefined,
                    tags: JSON.parse(reminder.tags),
                    createdDate: Number(reminder.createdDate),
                    date: reminder.date ? undefined : Number(reminder.date),
                    childrenReminders: isChild ? undefined : data?.filter((reminder) => reminder.parentID === parentID)
                  };
                  if (i === (numOfReminders ?? paginationPageLength) - 1)
                    return (
                      <Fragment key={reminder.id}>
                        <CurrentReminderProvider {...reminder}>
                          <Todo
                            // if this is the last reminder from the ones that were rendered, send a ref...
                            // ... which will trigger loading of more reminders
                            lastElementRef={lastElementRef}
                            {...otherReminderProps}
                            {...convertedProps}
                            reminderIndex={i}
                            onClick={handleReminderClick}
                            selectedIndex={selectedIndex}
                          />
                        </CurrentReminderProvider>
                      </Fragment>
                    );
                  else
                    return (
                      <Fragment key={reminder.id}>
                        <CurrentReminderProvider {...reminder}>
                          <Todo
                            {...otherReminderProps}
                            {...convertedProps}
                            reminderIndex={i}
                            onClick={handleReminderClick}
                            selectedIndex={selectedIndex}
                          />
                        </CurrentReminderProvider>
                      </Fragment>
                    );
                })}
                {provided.placeholder}
              </DroppableList>
            </>
          </ClickAwayListener>
        </Root>
      )}
    </Droppable>
  );
};
