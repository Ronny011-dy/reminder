import { useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import { fetchReminders } from '../../api/reminders';

import { Root, LeftMenu } from './ReminderWrapper.styles';
import { ReminderList } from './components/ReminderList/ReminderList';
import { NewReminder } from './components/NewReminder/NewReminder';
import { SubHeader } from './components/SubHeader/SubHeader';
import { DbReminder } from './ReminderWrapper.types';
import { Toaster } from 'react-hot-toast';
import { useIntersection } from '@mantine/hooks';
import { flat } from './utils/ReminderWrapper.util';
import { paginationPageLength } from '../../common/values';
import { useQueryMove } from '../../api/reactQueryMutations';

export const ReminderWrapper: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tagsToFilterArr, setTagsToFilterArr] = useState<string[]>([]);
  const [newReminderOpen, setNewReminderOpen] = useState(false);
  const newReminderRef = useRef<HTMLDivElement | null>(null);
  const moveMutation = useQueryMove();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['reminders'],
    queryFn: async ({ pageParam = 1 }) => fetchReminders(pageParam),
    getNextPageParam: (_, pages) => pages.length + 1
  });

  const filterData = (flatData: DbReminder[]): DbReminder[] | undefined => {
    return tagsToFilterArr.length === 0
      ? flatData
      : flatData.filter((reminder) => JSON.parse(reminder.tags).some((tag: string) => tagsToFilterArr.includes(tag)));
  };

  const isAddingNewReminder: boolean = newReminderOpen || flat(data).length === 0;

  const lastReminderRef = useRef<HTMLElement>(null);
  const { ref: lastElementRef, entry } = useIntersection({ root: lastReminderRef.current, threshold: 1 });

  useEffect(() => {
    // if the number of reminders on the last paginated page is lower than 5 then it's the last page
    // if it's exactly 5 but there are no more reminders, then one last fetch will occur, with 0(<5) reminders
    if ((data?.pages[data?.pages?.length - 1]?.length ?? 0) === paginationPageLength && entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  const filteredAndSearchedData = useMemo(() => {
    return filterData(flat(data))?.filter((reminder) => reminder.title.includes(searchQuery));
  }, [data, searchQuery, tagsToFilterArr]);

  const onDragEnd = (result: DropResult) => {
    console.log('Fired onDragEnd');
    const { destination, source, draggableId } = result;
    // if the destination is null - not in a droppable
    if (!destination) return;
    // if the reminder was placed in the same slot it was in before
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const flatData = flat(data);
    const sourceReminder = flatData.filter((reminder) => reminder.id === draggableId)[0];
    const destinationReminder = flatData[destination.index];

    if (!destinationReminder.orderID || !sourceReminder.orderID) return;

    const condition = sourceReminder.orderID < destinationReminder.orderID;

    const indexOfUpperReminder = condition ? destination.index - 1 : destination.index;
    const indexOfBottomReminder = condition ? destination.index : destination.index + 1;

    const upperReminder = flatData[indexOfUpperReminder];
    const bottomReminder = flatData[indexOfBottomReminder];

    moveMutation.mutate({ sourceReminder, destinationReminder, upperReminder, bottomReminder });
  };

  return (
    <Root>
      <Toaster />
      <SubHeader
        onCreate={setNewReminderOpen}
        searchHandler={setSearchQuery}
        setTagsToFilterArr={setTagsToFilterArr}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <LeftMenu>
          {isAddingNewReminder && (
            <NewReminder
              ref={newReminderRef}
              setNewReminderOpen={setNewReminderOpen}
              noReminders={filteredAndSearchedData?.length === 0}
            />
          )}
          <ReminderList
            data={filteredAndSearchedData}
            isChild={false}
            numOfReminders={filteredAndSearchedData && filteredAndSearchedData?.length - 1}
            lastElementRef={lastElementRef}
          />
        </LeftMenu>
      </DragDropContext>
    </Root>
  );
};
