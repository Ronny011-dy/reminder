import { createContext, ReactNode, useState } from 'react';
import { DbReminder } from '../../ReminderWrapper.types';

interface DataProviderProps {
  children: ReactNode;
}

interface ContextProviderProps {
  childReminders: DbReminder[];
  setChildReminders: React.Dispatch<React.SetStateAction<DbReminder[]>>;
}

const DataContext = createContext<ContextProviderProps | undefined>(undefined);

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [childReminders, setChildReminders] = useState<DbReminder[]>([]);
  return <DataContext.Provider value={{ childReminders, setChildReminders }}>{children}</DataContext.Provider>;
};

export { DataProvider, DataContext };
