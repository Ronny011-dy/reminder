import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { QueryClientWrapper } from './components/QueryClientWrapper/QueryClientWrapper';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientWrapper>
      <App />
    </QueryClientWrapper>
  </React.StrictMode>
);
