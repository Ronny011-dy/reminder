import { ClickAwayListener } from '@mui/material';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

import { Root, StyledDroppableWrapper } from './ReminderListParent.styles';
import { CurrentReminderProvider } from '../CurrentReminderProvider/CurrentReminderProvider';
import { Todo } from '../../../../components/Todo/Todo';
import { paginationPageLength } from '../../../../common/values';
import { Droppable } from '@hello-pangea/dnd';
import { DroppableList } from '../DroppableList/DroppableList';
import { NewReminder } from '../NewReminder/NewReminder';
import { useInfiniteQuery } from 'react-query';
import { useIntersection } from '@mantine/hooks';
import { filteredAndSearchedData } from '../../utils/ReminderWrapper.util';
import { fetchParentReminders } from '../../../../api/reminders';
import { DbReminder } from '../../ReminderWrapper.types';

interface ReminderListParentProps {
  searchQuery: string;
  filtersArr: string[];
  draggableId: string;
  setDraggableId: React.Dispatch<React.SetStateAction<string>>;
  sharedListsData: {
    parentID?: string;
    setParentID: React.Dispatch<React.SetStateAction<string | undefined>>;
    clickawayShouldHide: boolean;
    setClickAwayShouldHide: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export const ReminderListParent: React.FC<ReminderListParentProps> = ({
  searchQuery,
  filtersArr,
  draggableId,
  setDraggableId,
  sharedListsData
}) => {
  const { parentID, setParentID, clickawayShouldHide, setClickAwayShouldHide } = sharedListsData;
  const lastReminderRef = useRef<HTMLDivElement>(null);
  const { ref: lastElementRef, entry } = useIntersection({ root: lastReminderRef.current, threshold: 1 });
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['reminders'],
    queryFn: async ({ pageParam = 1 }) => fetchParentReminders(pageParam),
    getNextPageParam: (_, pages) => pages.length + 1
  });

  useEffect(() => {
    // if the number of reminders on the last paginated page is lower than 5 then it's the last page
    // if it's exactly 5 but there are no more reminders, then one last fetch will occur, with 0(<5) reminders
    if ((data?.pages[data?.pages?.length - 1]?.length ?? 0) === paginationPageLength && entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  const filteredAndSearchedDataParentData = useMemo<DbReminder[] | undefined>(() => {
    return filteredAndSearchedData(data, filtersArr, searchQuery);
  }, [data, filtersArr, searchQuery]);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleReminderClick = (_: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };
  // unselects any selected reminder on clickaway of entire list
  const handleClickAway = () => {
    setSelectedIndex(-1);
    clickawayShouldHide && setParentID(undefined);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Root>
        <NewReminder
          parentID={parentID}
          setClickAwayShouldHide={setClickAwayShouldHide}
        />
        <Droppable droppableId="parent">
          {(provided) => (
            <StyledDroppableWrapper>
              <DroppableList
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                {filteredAndSearchedDataParentData?.map((reminder, i) => {
                  const { tags, createdDate, date, parentID: reminderParentID, ...otherReminderProps } = reminder;
                  const convertedProps = {
                    parentID: reminderParentID ? reminderParentID : undefined,
                    tags: JSON.parse(tags),
                    createdDate: Number(createdDate),
                    date: reminder.date ? undefined : Number(date)
                  };
                  const bundledProps = {
                    ...otherReminderProps,
                    ...convertedProps,
                    setParentID,
                    handleReminderClick,
                    selectedIndex,
                    draggableId,
                    setDraggableId,
                    reminderIndex: i
                  };
                  if (i === (filteredAndSearchedDataParentData?.length ?? paginationPageLength) - 1)
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
            </StyledDroppableWrapper>
          )}
        </Droppable>
      </Root>
    </ClickAwayListener>
  );
};
