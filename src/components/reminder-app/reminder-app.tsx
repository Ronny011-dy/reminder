import React from 'react';

import { useQuery } from 'react-query';

import { List } from '@mui/material';

import { fetchRemindersDB } from '../../api/functions.api';

import { Todo } from '../to-do/to-do';
import { LoadingSkeleton } from './components/loading-skeleton/loading-skeleton';
import { ToastProvider } from '../toast-provider/toast-provider';
import { CreateReminder } from './components/create-reminder/create-reminder';
import { IdProvider } from './components/id-provider/id-provider';

import { Root } from './reminder-app.styles.js';
import { Theme } from '../theme/theme';

const ReminderApp: React.FC = () => {
  let parentId = '';
  //read. add, edit and delete have dedicated components
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['reminders'],
    queryFn: fetchRemindersDB,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <Theme>
      <Root>
        <ToastProvider>
          <div className="main-title-wrapper">
            <div className="main-title">reminder</div>
            <CreateReminder />
          </div>
          <List className="reminders-list">
            {data &&
              data.map((reminder) => {
                if (!reminder.parentId) {
                  parentId = reminder.id;
                  console.log(reminder.title, reminder.parentId);
                  return (
                    <IdProvider id={reminder.id} key={reminder.id}>
                      <Todo
                        done={Boolean(reminder.done)}
                        title={reminder.title}
                        description={reminder.description}
                        tags={JSON.parse(reminder.tags)}
                        createdDate={reminder.createdDate}
                        date={reminder.date}
                        important={reminder.important}
                        parentID={reminder.parentId}
                      />
                    </IdProvider>
                  );
                }
                if (reminder.parentId === parentId)
                  return (
                    <div className="child-reminder">
                      <IdProvider id={reminder.id} key={reminder.id}>
                        <Todo
                          done={Boolean(reminder.done)}
                          title={reminder.title}
                          description={reminder.description}
                          tags={JSON.parse(reminder.tags)}
                          createdDate={reminder.createdDate}
                          date={reminder.date}
                          important={reminder.important}
                          parentID={reminder.parentId}
                        />
                      </IdProvider>
                    </div>
                  );
              })}
            {/* {data && data.map((reminder) => reminde)} */}
          </List>
        </ToastProvider>
      </Root>
    </Theme>
  );
};

export { ReminderApp };
