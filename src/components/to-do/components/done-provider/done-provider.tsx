import React, { createContext, ReactNode } from 'react';

type DoneProviderProps = {
  children: ReactNode;
  done: boolean;
};

const DoneContext = createContext<boolean | undefined>(undefined);

const DoneProvider: React.FC<DoneProviderProps> = ({ children, done }) => {
  return <DoneContext.Provider value={done}>{children}</DoneContext.Provider>;
};

export { DoneProvider, DoneContext };
