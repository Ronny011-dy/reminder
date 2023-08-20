import { useEffect, useRef, useState } from 'react';
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
    if ((data?.pages[data?.pages?.length - 1]?.length ?? 0) === 10 && entry?.isIntersecting) fetchNextPage();
  }, [entry, data?.pages, fetchNextPage]);

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
            />
          </ClickAwayListener>
        )}
        <ReminderList
          data={filterData(flat(data))?.filter((reminder) => reminder.title.includes(searchQuery))}
          isChild={false}
          numOfReminders={flat(data).length - 1}
          lastElementRef={lastElementRef}
        />
      </LeftMenu>
      {isFetchingNextPage && <div className="bottom">Loading</div>}
    </Root>
  );
};

export { ReminderWrapper };
