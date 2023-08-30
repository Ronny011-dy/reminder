import { createContext, ReactNode } from 'react';
import { DbReminder } from '../../ReminderWrapper.types';

type DataProviderProps = {
  children: ReactNode;
  data?: DbReminder[];
};

const DataContext = createContext<DbReminder[] | undefined>(undefined);

const DataProvider: React.FC<DataProviderProps> = ({ children, data }) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export { DataProvider, DataContext };
