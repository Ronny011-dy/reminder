import { ClickAwayListener } from '@mui/material';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

import { Root, StyledDroppableWrapper } from './ReminderListSub.styles';
import { CurrentReminderProvider } from '../CurrentReminderProvider/CurrentReminderProvider';
import { Todo } from '../../../../components/Todo/Todo';
import { DbReminder } from '../../ReminderWrapper.types';
import { paginationPageLength } from '../../../../common/values';
import { Droppable } from '@hello-pangea/dnd';
import { DroppableList } from '../DroppableList/DroppableList';
import { NewReminder } from '../NewReminder/NewReminder';
import { useInfiniteQuery } from 'react-query';
import { fetchSubreminders } from '../../../../api/reminders';
import { useIntersection } from '@mantine/hooks';
import { filteredAndSearchedData } from '../../utils/ReminderWrapper.util';

interface ReminderListSubProps {
  searchQuery: string;
  filtersArr: string[];
  draggableId: string;
  setDraggableId: React.Dispatch<React.SetStateAction<string>>;
  sharedListsData: {
    parentID?: string;
    setParentID: React.Dispatch<React.SetStateAction<string | undefined>>;
    setClickAwayShouldHide: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export const ReminderListSub: React.FC<ReminderListSubProps> = ({
  draggableId,
  setDraggableId,
  sharedListsData,
  searchQuery,
  filtersArr
}) => {
  const { parentID, setParentID, setClickAwayShouldHide } = sharedListsData;
  const lastReminderRef = useRef<HTMLDivElement>(null);
  const { ref: lastElementRef, entry } = useIntersection({ root: lastReminderRef.current, threshold: 1 });
  const parentIDForFetch = parentID || '';

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['subreminders', parentIDForFetch],
    queryFn: async ({ pageParam = 1 }) => fetchSubreminders(pageParam, parentIDForFetch),
    getNextPageParam: (_, pages) => pages.length + 1
  });

  useEffect(() => {
    if ((data?.pages[data?.pages?.length - 1]?.length ?? 0) === paginationPageLength && entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  const filteredAndSearchedDataSubData = useMemo<DbReminder[] | undefined>(() => {
    return !parentID
      ? []
      : (data?.pages[0]?.length ?? 0) > 0
      ? filteredAndSearchedData(data, filtersArr, searchQuery)
      : [];
  }, [data, filtersArr, searchQuery]);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleReminderClick = (_: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setClickAwayShouldHide(false);
    setSelectedIndex(index);
  };
  // unselects any selected reminder on clickaway of entire list
  const handleClickAway = () => {
    setSelectedIndex(-1);
    setClickAwayShouldHide(true);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Root>
        <NewReminder
          isChild
          parentID={parentID}
          setClickAwayShouldHide={setClickAwayShouldHide}
        />
        <Droppable droppableId="child">
          {(provided) => (
            <StyledDroppableWrapper>
              <DroppableList
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                {filteredAndSearchedDataSubData?.map((reminder, i) => {
                  const { tags, createdDate, date, parentID: reminderParentID, ...otherReminderProps } = reminder;
                  const convertedProps = {
                    parentID: reminderParentID ? reminderParentID : undefined,
                    tags: JSON.parse(tags),
                    createdDate: Number(createdDate),
                    date: reminder.date ? undefined : Number(date)
                  };
                  const isChild = true;
                  const bundledProps = {
                    ...otherReminderProps,
                    ...convertedProps,
                    setParentID,
                    isChild,
                    handleReminderClick,
                    selectedIndex,
                    draggableId,
                    setDraggableId,
                    reminderIndex: i
                  };
                  if (i === (filteredAndSearchedDataSubData?.length ?? paginationPageLength) - 1)
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
