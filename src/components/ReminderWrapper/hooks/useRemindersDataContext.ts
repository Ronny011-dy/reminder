import { useContext } from 'react';

import { DataContext } from '../components/DataProvider/DataProvider';
import { DBReminder } from '../ReminderWrapper.types';

const useRemindersDataContext = (): DBReminder[] => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useRemindersDataContext must be used within DataProvider');
  }

  return context;
};

export { useRemindersDataContext };
