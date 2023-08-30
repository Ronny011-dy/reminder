import { useContext } from 'react';

import { DataContext } from '../components/DataProvider/DataProvider';
import { DbReminder } from '../ReminderWrapper.types';

const useRemindersDataContext = (): DbReminder[] => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useRemindersDataContext must be used within DataProvider');
  }

  return context;
};

export { useRemindersDataContext };
