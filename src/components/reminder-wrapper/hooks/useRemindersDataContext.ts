import { useContext } from 'react';

import { DataContext } from '../components/data-provider/data-provider';
import { DBReminder } from '../types';

const useRemindersDataContext = (): DBReminder[] => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useRemindersDataContext must be used within DataProvider');
  }

  return context;
};

export { useRemindersDataContext };
