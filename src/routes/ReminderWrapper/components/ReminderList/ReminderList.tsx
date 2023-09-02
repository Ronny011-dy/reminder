import { ClickAwayListener } from '@mui/material';
import { Fragment, useState } from 'react';

import { Root, StyledProvidedWrapper } from './ReminderList.styles';
import { CurrentReminderProvider } from '../CurrentReminderProvider/CurrentReminderProvider';
import { Todo } from '../../../../components/Todo/Todo';
import { DbReminder } from '../../ReminderWrapper.types';
import { paginationPageLength } from '../../../../common/values';
import { Droppable } from '@hello-pangea/dnd';
import { DroppableList } from '../DroppableList/DroppableList';
import { useRemindersDataContext } from '../../hooks/useRemindersDataContext';
import { NewReminder } from '../NewReminder/NewReminder';

interface ReminderListProps {
  data?: DbReminder[];
  isChild?: boolean;
  lastElementRef?: (element: HTMLDivElement) => void;
  draggableId: string;
  setDraggableId: React.Dispatch<React.SetStateAction<string>>;
}

export const ReminderList: React.FC<ReminderListProps> = ({
  data,
  isChild,
  lastElementRef,
  draggableId,
  setDraggableId
}) => {
  const { childReminders, parentID } = useRemindersDataContext();
  // if reminders marked as isChild return all children, else render out only parent reminders
  const reminders = isChild ? childReminders : data?.filter((reminder) => reminder.parentID === null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleReminderClick = (_: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  const handleClickAway = () => setSelectedIndex(-1);
  return (
    <Root
      shouldHide={isChild && !parentID}
      className="problematic"
    >
      <NewReminder isChild={isChild} />
      <Droppable droppableId={isChild ? 'child' : 'parent'}>
        {(provided) => (
          <StyledProvidedWrapper>
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
                      date: reminder.date ? undefined : Number(reminder.date)
                    };
                    const bundledProps = {
                      ...otherReminderProps,
                      ...convertedProps,
                      isChild,
                      handleReminderClick,
                      selectedIndex,
                      draggableId,
                      setDraggableId,
                      reminderIndex: i,
                      childrenReminders: isChild
                        ? undefined
                        : data?.filter((reminder) => reminder.parentID === otherReminderProps.id)
                    };
                    if (i === (reminders?.length ?? paginationPageLength) - 1)
                      return (
                        <Fragment key={reminder.id}>
                          <CurrentReminderProvider {...reminder}>
                            <Todo
                              // if this is the last reminder from the ones that were rendered, send a ref...
                              // ... which will trigger loading of more reminders
                              lastElementRef={lastElementRef}
                              {...bundledProps}
                            />
                          </CurrentReminderProvider>
                        </Fragment>
                      );
                    else
                      return (
                        <Fragment key={reminder.id}>
                          <CurrentReminderProvider {...reminder}>
                            <Todo {...bundledProps} />
                          </CurrentReminderProvider>
                        </Fragment>
                      );
                  })}
                  {provided.placeholder}
                </DroppableList>
              </>
            </ClickAwayListener>
          </StyledProvidedWrapper>
        )}
      </Droppable>
    </Root>
  );
};
