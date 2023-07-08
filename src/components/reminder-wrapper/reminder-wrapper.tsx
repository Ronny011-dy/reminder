import { useQuery } from 'react-query';

import { fetchRemindersDB } from '../../api/functions.api';

// import { LoadingSkeleton } from './components/loading-skeleton/loading-skeleton';
import { ToastProvider } from '../toast-provider/toast-provider';
import { CreateReminder } from './components/create-reminder/create-reminder';
import { DataProvider } from './components/data-provider/data-provider';

import {
  Root,
  MainTitleStyle,
  MainTitleWrapperStyle,
} from './reminder-wrapper.styles';
import { ReminderList } from './components/reminder-list/reminder-list';

const ReminderWrapper: React.FC = () => {
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
  const parents = data?.filter((reminder) => reminder.parentId === null);
  return (
    <Root>
      <ToastProvider>
        <MainTitleWrapperStyle>
          <MainTitleStyle>reminder</MainTitleStyle>
          <CreateReminder />
        </MainTitleWrapperStyle>
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
