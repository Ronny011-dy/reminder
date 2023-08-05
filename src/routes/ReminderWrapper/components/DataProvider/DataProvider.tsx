import { createContext, ReactNode } from 'react';
import { DBReminder } from '../../ReminderWrapper.types';

type DataProviderProps = {
  children: ReactNode;
  data?: DBReminder[];
};

const DataContext = createContext<DBReminder[] | undefined>(undefined);

const DataProvider: React.FC<DataProviderProps> = ({ children, data }) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export { DataProvider, DataContext };
