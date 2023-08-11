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
  const [newReminderOpen, setNewReminderOpen] = useState(false);
  const newReminderRef = useRef<HTMLDivElement | null>(null);
  const { isError, data, error } = useQuery({
    queryKey: ['reminders'],
    queryFn: fetchRemindersDB,
  });

  if (isError)
    return (
      <div>
        Error occurred while fetching data {`Error description: ${error}`}
      </div>
    );
  // by not returning the first two blocks, we assume data exists
  const handleClickAway = () => {
    setNewReminderOpen(false);
  };
  const isAdding: boolean = newReminderOpen || data?.length === 0;
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
          <ReminderList data={data} isChild={false} />
        </LeftMenu>
      </ToastProvider>
    </Root>
  );
};

export { ReminderWrapper };
