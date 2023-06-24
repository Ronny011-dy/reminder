//TODO: clean everything up using best practices and code styling guide, then move to App.tsx to free up reminders component

import React from 'react';

import { useQuery } from 'react-query';

import { Skeleton, List } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { fetchRemindersList } from './utils/reminder-app.util';

import { Todo } from '../to-do/to-do';

import { AppWrapper } from './reminder-app.styles.js';

import { Theme } from '../theme/theme';

const ReminderApp: React.FC = () => {
  // * CRUDs

  //read
  const { isLoading, isError, data, error } = useQuery(
    'reminders',
    fetchRemindersList
  );

  //delete

  //TODO:
  //* reminders:
  //* add, delete, edit, create,add sub-reminder

  return (
    <Theme>
      <div className="main-wrapper">
        <AppWrapper className="app-wrapper">
          <div className="main-title-wrapper">
            <div className="main-title">reminder</div>
            <AddIcon className="action add-reminder" />
          </div>
          <List className="reminders-list">
            {data &&
              data.map((reminder) => (
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
              ))}
          </List>
        </AppWrapper>
      </div>
    </Theme>
  );
};

export { ReminderApp };
