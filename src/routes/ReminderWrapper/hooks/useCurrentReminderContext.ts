import { useContext } from 'react';

import { CurrentReminderContext } from '../components/CurrentReminderProvider/CurrentReminderProvider';
import { DBReminder } from '../ReminderWrapper.types';

export const useCurrentReminderContext = (): DBReminder => {
  const context = useContext(CurrentReminderContext);

  if (!context) {
    throw new Error('useCurrentReminderContext must be used within CurrentReminderProvider');
  }

  return context;
};
