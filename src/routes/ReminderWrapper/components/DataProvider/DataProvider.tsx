import { createContext, ReactNode, useState } from 'react';
import { DbReminder } from '../../ReminderWrapper.types';

interface DataProviderProps {
  children: ReactNode;
}

interface ContextProviderProps {
  parentID?: string;
  setParentID: React.Dispatch<React.SetStateAction<string | undefined>>;
  childReminders: DbReminder[];
  setChildReminders: React.Dispatch<React.SetStateAction<DbReminder[]>>;
}

const DataContext = createContext<ContextProviderProps | undefined>(undefined);

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [parentID, setParentID] = useState<string | undefined>(undefined);
  const [childReminders, setChildReminders] = useState<DbReminder[]>([]);
  return (
    <DataContext.Provider value={{ parentID, setParentID, childReminders, setChildReminders }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
