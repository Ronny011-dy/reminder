import { createContext, ReactNode } from 'react';
import { DBReminder } from '../../ReminderWrapper.types';

type CurrentReminderProviderProps = {
  children: ReactNode;
} & DBReminder;

const CurrentReminderContext = createContext<DBReminder | undefined>(undefined);

const CurrentReminderProvider: React.FC<CurrentReminderProviderProps> = ({ children, ...reminderProps }) => {
  return <CurrentReminderContext.Provider value={reminderProps}>{children}</CurrentReminderContext.Provider>;
};

export { CurrentReminderContext, CurrentReminderProvider };
