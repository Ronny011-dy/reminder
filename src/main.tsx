import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { App } from './App';
import { QueryClientWrapper } from './components/QueryClientWrapper/QueryClientWrapper';
import './index.css';
import { About } from './routes/About/About';
import { ReminderWrapper } from './routes/ReminderWrapper/ReminderWrapper';
import { Theme } from './components/Theme/Theme';
import { Settings } from './routes/Settings/Settings';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ReminderWrapper />,
      },
      { path: 'about', element: <About /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientWrapper>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </QueryClientWrapper>
  </React.StrictMode>
);
