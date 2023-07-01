import React from 'react';

import { useQuery } from 'react-query';

import { List } from '@mui/material';

import { fetchRemindersDB } from '../../api/functions.api';

import { Todo } from '../to-do/to-do';
import { LoadingSkeleton } from './components/loading-skeleton/loading-skeleton';
import { ToastWrapper } from '../toast-provider/toast-provider';
import { CreateReminder } from './components/create-reminder/create-reminder';
import { IdProvider } from '../to-do/components/id-provider/id-provider';

import { Root } from './reminder-app.styles.js';
import { Theme } from '../theme/theme';

const ReminderApp: React.FC = () => {
  // * CRUDs

  //read
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
  //add - has a dedicated component

  //delete - will have a dedicated component

  //TODO:
  //* reminders:
  //* add, delete, edit, create,add sub-reminder

  return (
    <Theme>
      <Root>
        <ToastWrapper>
          <div className="main-title-wrapper">
            <div className="main-title">reminder</div>
            <CreateReminder />
          </div>
          <List className="reminders-list">
            {data &&
              data.map(
                (reminder) =>
                  !reminder.parentID && (
                    <IdProvider id={reminder.id}>
                      <Todo
                        key={reminder.id}
                        done={Boolean(reminder.done)}
                        title={reminder.title}
                        description={reminder.description}
                        tags={JSON.parse(reminder.tags)}
                        createdDate={reminder.createdDate}
                        date={reminder.date}
                        important={reminder.important}
                        parentID={reminder.parentID}
                      />
                    </IdProvider>
                  )
              )}
          </List>
        </ToastWrapper>
      </Root>
    </Theme>
  );
};

export { ReminderApp };
