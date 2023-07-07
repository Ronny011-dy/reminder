import { useQuery } from 'react-query';

import { fetchRemindersDB } from '../../api/functions.api';

// import { LoadingSkeleton } from './components/loading-skeleton/loading-skeleton';
import { ToastProvider } from '../toast-provider/toast-provider';
import { CreateReminder } from './components/create-reminder/create-reminder';

import {
  Root,
  MainTitleStyle,
  MainTitleWrapeprStyle,
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

  if (isError) {
    return (
      <div>
        Error occurred while fetching data {`Error description: ${error}`}
      </div>
    );
  }

  return (
    <Root>
      <ToastProvider>
        <MainTitleWrapeprStyle>
          <MainTitleStyle>reminder</MainTitleStyle>
          <CreateReminder />
        </MainTitleWrapeprStyle>
        <ReminderList data={data} />
      </ToastProvider>
    </Root>
  );
};

export { ReminderWrapper };
