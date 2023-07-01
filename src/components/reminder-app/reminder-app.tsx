import React from 'react';

import { useState, createContext, useContext } from 'react';

import { useQuery } from 'react-query';

import { List } from '@mui/material';

import { fetchRemindersDB } from '../../api/functions.api';

import { Todo } from '../to-do/to-do';
import { LoadingSkeleton } from './components/loading-skeleton/loading-skeleton';
import { Toast } from '../toast-wrapper/ components/toast/toast';
import { ToastWrapper } from '../toast-wrapper/toast-wrapper';
import { CreateReminder } from './components/create-reminder/create-reminder';

import { Root } from './reminder-app.styles.js';
import { Theme } from '../theme/theme';

const ReminderApp: React.FC = () => {
  // toast
  const [openToast, setOpenToast] = useState(false);
  const [isToastError, setIsToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

  //delete

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
        </ToastWrapper>
      </Root>
    </Theme>
  );
};

export { ReminderApp };
