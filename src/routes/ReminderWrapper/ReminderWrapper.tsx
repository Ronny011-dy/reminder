import { useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { fetchRemindersDB } from '../../api/functions.api';

import { ToastProvider } from '../../components/ToastProvider/ToastProvider';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Root, LeftMenu } from './ReminderWrapper.styles';
import { ReminderList } from './components/ReminderList/ReminderList';
import { NewReminder } from './components/NewReminder/NewReminder';
import { SubHeader } from './components/SubHeader/SubHeader';
import { DBReminder } from './ReminderWrapper.types';

const ReminderWrapper: React.FC = () => {
  const queryClient = useQueryClient();

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
  const [newReminderOpen, setNewReminderOpen] = useState(false);
  const newReminderRef = useRef<HTMLDivElement | null>(null);
  const cachedData: DBReminder[] | undefined =
    queryClient.getQueryData('reminders');
  const handleClickAway = () => {
    setNewReminderOpen(false);
  };
  const isAdding: boolean = newReminderOpen || cachedData?.length === 0;
  return (
    <Root>
      <ToastProvider>
        <SubHeader onCreate={setNewReminderOpen} />
        <LeftMenu>
          {isAdding && (
            // MUI click-away listener requires access to DOM node, hence the ref
            <ClickAwayListener onClickAway={handleClickAway}>
              <NewReminder ref={newReminderRef} onSubmit={setNewReminderOpen} />
            </ClickAwayListener>
          )}
          <ReminderList data={cachedData} isChild={false} />
        </LeftMenu>
      </ToastProvider>
    </Root>
  );
};

export { ReminderWrapper };
