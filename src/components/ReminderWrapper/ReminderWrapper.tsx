import { useRef } from 'react';
import { useQuery } from 'react-query';

import { fetchRemindersDB } from '../../api/functions.api';

// import { LoadingSkeleton } from './components/loading-skeleton/loading-skeleton';
import { ToastProvider } from '../ToastProvider/ToastProvider';
import ClickAwayListener from '@mui/base/ClickAwayListener';

import { DataProvider } from './components/DataProvider/DataProvider';

import { Root } from './ReminderWrapper.styles';
import { ReminderList } from './components/ReminderList/ReminderList';
import { NewReminder } from './components/NewReminder/NewReminder';

type ReminderWrapperProps = {
  hasNewReminder: boolean;
  onNewReminderClickAway: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReminderWrapper: React.FC<ReminderWrapperProps> = ({
  hasNewReminder,
  onNewReminderClickAway,
}) => {
  const newReminderRef = useRef<HTMLDivElement | null>(null);
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
  const handleClickAway = () => {
    onNewReminderClickAway(false);
  };
  return (
    <Root>
      <ToastProvider>
        {hasNewReminder && (
          // MUI click-away listener requires access to DOM node, hence the ref
          <ClickAwayListener onClickAway={handleClickAway}>
            <NewReminder
              ref={newReminderRef}
              onSubmit={onNewReminderClickAway}
            />
          </ClickAwayListener>
        )}
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
