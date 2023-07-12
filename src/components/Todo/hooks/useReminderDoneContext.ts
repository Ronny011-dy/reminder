import { useContext } from 'react';

import { DoneContext } from '../components/DoneProvider/DoneProvider';

const useReminderDoneContext = (): boolean => {
  const context = useContext(DoneContext);

  if (typeof context === 'undefined') {
    throw new Error('useReminderDoneContext must be used within DoneProvider');
  }

  return context;
};

export { useReminderDoneContext };
