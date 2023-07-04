import React, { createContext, ReactNode } from 'react';

type IdProviderProps = {
  children: ReactNode;
  id: string;
};

const IdContext = createContext<string | undefined>(undefined);

const IdProvider: React.FC<IdProviderProps> = ({ children, id }) => {
  return <IdContext.Provider value={id}>{children}</IdContext.Provider>;
};

export { IdContext, IdProvider };
