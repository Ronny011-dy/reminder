import React, { ReactNode } from 'react';

import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

type QueryClientWrapperProps = {
  children: ReactNode;
};

const reactQueryClient = new QueryClient();

const QueryClientWrapper: React.FC<QueryClientWrapperProps> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={reactQueryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export { QueryClientWrapper };
