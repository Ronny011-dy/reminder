import { useQuery } from 'react-query';

import { fetchRemindersDB } from '../../api/functions.api';

// import { LoadingSkeleton } from './components/loading-skeleton/loading-skeleton';
import { ToastProvider } from '../ToastProvider/ToastProvider';
import { CreateReminder } from './components/CreateReminder_db/CreateReminder_db';
import { DataProvider } from './components/DataProvider/DataProvider';

import {
  Root,
  MainTitleStyle,
  MainTitleWrapperStyle,
} from './ReminderWrapper.styles';
import { ReminderList } from './components/ReminderList/ReminderList';
import { useState } from 'react';
import { NewReminder } from './components/NewReminder/NewReminder';

const ReminderWrapper: React.FC = () => {
  const [hasNewReminder, setHasNewReminder] = useState(false);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['reminders'],
    queryFn: fetchRemindersDB,
  });

  //TODO: Create a new Skeleton aften revamping design
  // if (isLoading) {
  //   return <LoadingSkeleton />;
  // }

  if (isError)
    return (
      <div>
        Error occurred while fetching data {`Error description: ${error}`}
      </div>
    );
  // by not returning the first two blocks, we assume data exists
  const parents = data?.filter((reminder) => reminder.parentID === null);
  return (
    <Root>
      <ToastProvider>
        <NewReminder />
        {/* //* reminder doesn't have a data/childs property so context is needed. */}
        {/* //* reminder list will get data passed down from reinder - to render childs*/}
        <DataProvider data={data}>
          <ReminderList data={parents} />
        </DataProvider>
      </ToastProvider>
    </Root>
  );
};

export { ReminderWrapper };
