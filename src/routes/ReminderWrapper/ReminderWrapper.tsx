import { useRef, useState } from 'react';
import { useQuery } from 'react-query';

import { fetchRemindersDB } from '../../api/functions.api';

import { ToastProvider } from '../../components/ToastProvider/ToastProvider';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Root, LeftMenu } from './ReminderWrapper.styles';
import { ReminderList } from './components/ReminderList/ReminderList';
import { NewReminder } from './components/NewReminder/NewReminder';
import { SubHeader } from './components/SubHeader/SubHeader';

const ReminderWrapper: React.FC = () => {
  const { isError, data, error } = useQuery({
    queryKey: ['reminders'],
    queryFn: fetchRemindersDB,
    staleTime: 10 * (60 * 1000), // 10 mins
    cacheTime: 15 * (60 * 1000), // 15 mins
  });

  if (isError)
    return (
      <div>
        Error occurred while fetching data {`Error description: ${error}`}
      </div>
    );
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersArr, setFiltersArr] = useState<string[]>([]);
  const filterData = () => {
    if (filtersArr.length === 0) return data;
    return data?.filter((reminder) =>
      JSON.parse(reminder.tags).some((tag: string) => filtersArr.includes(tag))
    );
  };
  const [newReminderOpen, setNewReminderOpen] = useState(false);
  const newReminderRef = useRef<HTMLDivElement | null>(null);
  const handleClickAway = () => {
    setNewReminderOpen(false);
  };
  const isAdding: boolean = newReminderOpen || data?.length === 0;
  return (
    <Root>
      <ToastProvider>
        <SubHeader
          onCreate={setNewReminderOpen}
          searchHandler={setSearchQuery}
          filterHandler={setFiltersArr}
        />
        <LeftMenu>
          {isAdding && (
            // MUI click-away listener requires access to DOM node, hence the ref
            <ClickAwayListener onClickAway={handleClickAway}>
              <NewReminder ref={newReminderRef} onSubmit={setNewReminderOpen} />
            </ClickAwayListener>
          )}
          <ReminderList
            data={filterData()?.filter((reminder) =>
              reminder.title.includes(searchQuery)
            )}
            isChild={false}
          />
        </LeftMenu>
      </ToastProvider>
    </Root>
  );
};

export { ReminderWrapper };
