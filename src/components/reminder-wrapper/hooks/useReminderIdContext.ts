import { useContext } from 'react';

import { IdContext } from '../components/id-provider/id-provider';

const useReminderIdContext = (): string => {
  const context = useContext(IdContext);

  if (!context) {
    throw new Error('useReminderIdContext must be used within IdProvider');
  }

  return context;
};

export { useReminderIdContext };
