import { useContext } from 'react';

import { DataContext } from '../components/DataProvider/DataProvider';

export const useRemindersDataContext = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useRemindersDataContext must be used within DataProvider');
  }

  return context;
};
