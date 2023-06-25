import React from 'react';

import { useQuery } from 'react-query';

import { List } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { fetchRemindersList } from './utils/reminder-app.util';

import { Todo } from '../to-do/to-do';
import { LoadingSkeleton } from './components/loading-skeleton/loading-skeleton';

import { Root } from './reminder-app.styles.js';
import { Theme } from '../theme/theme';

const ReminderApp: React.FC = () => {
  // * CRUDs

  //read
  const { isLoading, isError, data, error } = useQuery(
    'reminders',
    fetchRemindersList
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  //delete

  //TODO:
  //* reminders:
  //* add, delete, edit, create,add sub-reminder

  return (
    <Theme>
      <Root>
        <div className="main-title-wrapper">
          <div className="main-title">reminder</div>
          <AddIcon className="action add-reminder" />
        </div>
        <List className="reminders-list">
          {data &&
            data.map(
              (reminder) =>
                !reminder.parentID && (
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
                )
            )}
        </List>
      </Root>
    </Theme>
  );
};

export { ReminderApp };
