//TODO: clean everything up using best practices and code styling guide, then move to App.tsx to free up reminders component

import * as React from 'react';
import { useMemo, useState } from 'react';
//generate random IDs deterministic agents like crawlers can cause duplicates
import { v1 as uuidv1 } from 'uuid';
// fetch wrapper
import ky from 'ky';
import { useQuery } from 'react-query';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import AddIcon from '@mui/icons-material/Add';

import useLocalStorage from '../../hooks/useLocalStorage.js';
import type { Reminder } from '../to-do/types';
import type { DBReminder } from './types';
import { getCookieValue } from '../../utils/funcs.util.js';
import GroupList from '../groupList/group-list';
import { Button } from '@mui/material';
import List from '@mui/material/List';
import Todo from '../to-do/to-do';

import { WrapperDiv } from './reminder-app.styles.js';
import { GlobalStyles } from './reminder-app.styles.js';

const idGenerator = () => Number(uuidv1());

//*API call :D
const fetchRemindersList = async (): Promise<DBReminder[]> => {
  return await ky.get('/api/read', {}).json();
  // console.log(json);
};

const ReminderApp = () => {
  const { isLoading, isError, data, error } = useQuery(
    'reminders',
    fetchRemindersList
  );

  // theme handling
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  // * CRUDs - group {id: string, title?: String, completed?: boolean, ungrouped?: boolean, reminders: Reminder[]}

  const addReminder = (reminder: DBReminder) =>
    setReminders((prevReminders) => [reminder, ...prevReminders]);

  //TODO needs setActiveGroup(gid) at some level
  const deleteReminder = (reminderProps: DBReminder) =>
    setReminders((prevReminders) =>
      prevReminders.filter((reminder) => reminder !== reminderProps)
    );

  // as the custom hook doesn't support reads from localStorage, this function checks if the group reminders exist and returns them
  const getGroupReminders = (gid: string): Reminder[] | boolean => {
    const extracted = window.localStorage.getItem(gid);

    const parsed = extracted !== null && JSON.parse(extracted);
    //returns false if item with key gid doesn't exist, otherwise returns the item
    return parsed !== false && parsed;
  };

  // * handlers that get drilled down

  // if the setActive is not yet updated as epxected, then the first reminder created is epxected to be added to '0'
  const reminderAddClickHandler = async (gid: string) => {
    //TODO clean comments - should I still use the asyn await wrapper here? maybe I need to do something on the group level
    setActiveGroup(gid);
    //TODO - change to int IDs as UUID is overkill and we want to have INT in DB ==> but maybe not in the type object, because Egor didn't mention it
    // addReminder({ id: idGenerator(), title: '', createdDate: Date.now() });
  };

  //TODO
  const reminderTextEditHandler = (id: string, value: string) => {};

  // * state and localStorage //TODO: convert to DB

  const [activeGroup, setActiveGroup] = useState('0');
  // holds only the "active" group's reminders. needed only for creating and editing (not purging). initiall pass empty array to 'ungrouped' group
  const [reminders, setReminders] = useLocalStorage<DBReminder[]>(
    activeGroup,
    []
  );

  const [newReminders, setNewRemindiers] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <GlobalStyles />
      <div className="main-wrapper">
        <WrapperDiv className="app-wrapper">
          <div className="main-title-wrapper">
            <div className="main-title">reminder</div>
            <AddIcon className="action add-reminder" />
          </div>
          {/* <GroupList
            groups={groups}
            onGroupDelete={groupDeleteClickHandler}
            allReminders={reminders}
            onReminderAdd={reminderAddClickHandler}
            getGroupReminders={getGroupReminders}
          /> */}
          <List className="reminders-list">
            {data &&
              data.map(
                ({
                  id,
                  done,
                  title,
                  description,
                  tags,
                  createdDate,
                  date,
                  important,
                  parentID,
                }) => (
                  <Todo
                    key={id}
                    done={Boolean(done)}
                    title={title}
                    description={description}
                    tags={JSON.parse(tags)}
                    createdDate={createdDate}
                    date={date}
                    important={important}
                    parentID={parentID}
                  />
                )
              )}
          </List>
        </WrapperDiv>
      </div>
    </ThemeProvider>
  );
};

export default ReminderApp;

{
  /* {data &&
          data.map((reminder) => (
            <div key={reminder.id}>
              Fetched from Data Base:
              <br></br>
              <br></br>
              Title:
              {reminder.title} <br></br>
              Description:
              {reminder.description}
              <br></br>
              Tags:
              {reminder.tags}
              <br></br>
              Done:
              {String(Boolean(reminder.done)).toUpperCase()}
              <br></br>
              Date Created:
              {reminder.createdDate && String(new Date(reminder.createdDate))}
            </div>
          ))} */
}
