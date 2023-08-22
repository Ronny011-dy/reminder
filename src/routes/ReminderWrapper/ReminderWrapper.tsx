import { useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { fetchReminders } from '../../api/reminders';

import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Root, LeftMenu } from './ReminderWrapper.styles';
import { ReminderList } from './components/ReminderList/ReminderList';
import { NewReminder } from './components/NewReminder/NewReminder';
import { SubHeader } from './components/SubHeader/SubHeader';
import { DBReminder } from './ReminderWrapper.types';
import { Toaster } from 'react-hot-toast';
import { useIntersection } from '@mantine/hooks';
import { flat } from './utils/ReminderWrapper.util';
import { paginationPageLength } from '../../common/values';

const ReminderWrapper: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersArr, setFiltersArr] = useState<string[]>([]);
  const [newReminderOpen, setNewReminderOpen] = useState(false);
  const newReminderRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['reminders'],
    queryFn: async ({ pageParam = 1 }) => fetchReminders(pageParam),
    getNextPageParam: (_, pages) => pages.length + 1
  });

  const filterData = (flatData: DBReminder[]): DBReminder[] | undefined => {
    return filtersArr.length === 0
      ? flatData
      : flatData.filter((reminder) => JSON.parse(reminder.tags).some((tag: string) => filtersArr.includes(tag)));
  };
  // useMemo should be used if the calculation becomes expensive
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
  }, [data, searchQuery, filtersArr]);

  return (
    <Root>
      <Toaster />
      <SubHeader
        onCreate={setNewReminderOpen}
        searchHandler={setSearchQuery}
        filterHandler={setFiltersArr}
      />
      <LeftMenu>
        {isAddingNewReminder && (
          // MUI click-away listener requires access to DOM node, hence the ref
          <ClickAwayListener onClickAway={() => setNewReminderOpen(false)}>
            <NewReminder
              ref={newReminderRef}
              onSubmit={setNewReminderOpen}
              noReminders={filteredAndSearchedData?.length === 0}
            />
          </ClickAwayListener>
        )}
        <ReminderList
          data={filteredAndSearchedData}
          isChild={false}
          numOfReminders={flat(data).length - 1}
          lastElementRef={lastElementRef}
        />
      </LeftMenu>
    </Root>
  );
};

export { ReminderWrapper };
