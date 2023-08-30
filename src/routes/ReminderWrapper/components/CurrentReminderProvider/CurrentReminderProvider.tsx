import { createContext, ReactNode } from 'react';
import { DbReminder } from '../../ReminderWrapper.types';

type CurrentReminderProviderProps = {
  children: ReactNode;
} & DbReminder;

const CurrentReminderContext = createContext<DbReminder | undefined>(undefined);

const CurrentReminderProvider: React.FC<CurrentReminderProviderProps> = ({ children, ...reminderProps }) => {
  return <CurrentReminderContext.Provider value={reminderProps}>{children}</CurrentReminderContext.Provider>;
};

export { CurrentReminderContext, CurrentReminderProvider };
