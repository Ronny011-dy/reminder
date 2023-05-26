import { ReactElement, useState, useMemo } from 'react';

import { v4 as uuidv4 } from 'uuid';

import styled from 'styled-components';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import Group from '../group/group.component';
import Todo from '../to-do/to-do.component';

// styling
const WrapperDiv = styled.div`
  border: 2px solid rgb(174, 174, 174);
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 20px;
  .main-title-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    .main-title {
      font-family: 'Pacifico', cursive;
      font-size: 35px;
      font-weight: bold;
    }
    .add {
      color: gray;
      height: 20px;
      width: auto;
      margin-left: 5px;
      &:hover {
        color: black;
        filter: drop-shadow(0px 0px 1px #ffffff)
          drop-shadow(0px 0px 1px #ffffff) drop-shadow(0px 0px 1px #ffffff);
      }
    }
  }
`;

type ReminderGroupObj = {
  key: string;
  component: ReactElement;
  reminders: ReactElement[];
};

const Reminder = () => {
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

  const findList = (key: string) => {
    // rgo - Reminders under Group Array
    const rgo = reminderGroupArr.find((rgo) => rgo.key === key);
    return rgo ? rgo.reminders : [];
  };
  //TODO
  const groupAddClickHandler = () => {
    const groupID = uuidv4();
    // setGroupList(groupList.concat(<Group key={groupID} reminders={[]} />));
  };

  const reminderAddClickHandler = (groupID: string) => {
    const reminderID = uuidv4();
    setReminderGroupArr((current) =>
      current.map((group) =>
        group.key === groupID
          ? {
              ...group,
              reminders: [
                ...group.reminders,
                <Todo
                  key={reminderID}
                  id={reminderID}
                  title=""
                  createdDate={Date.now()}
                />,
              ],
            }
          : group
      )
    );
  };

  const getGroups = () => {
    const groupsArr = reminderGroupArr.map((group) => group.component);
    const completedGroup = groupsArr.pop();
    const ungroupedGroup = groupsArr.pop();
    return (
      <>
        {findList('0').length > 0 ? ungroupedGroup : ''}
        {groupsArr}
        <Divider className="breaker" flexItem />
        <br />
        {completedGroup}
      </>
    );
  };

  const [reminderGroupArr, setReminderGroupArr] = useState<ReminderGroupObj[]>([
    // 0 is reserved for ungrouped, 1 is reserved for completed. DB should be used, we can use localStorage for now
    {
      key: '0',
      component: (
        <Group
          key="0"
          id="0"
          title="Ungrouped"
          ungrouped
          reminders={findList}
          globalRemindersAddHandler={reminderAddClickHandler}
        />
      ),
      reminders: [],
    },
    {
      key: '1',
      component: (
        <Group
          key="1"
          id="1"
          title="Completed"
          completed
          reminders={findList}
          globalRemindersAddHandler={reminderAddClickHandler}
        />
      ),
      reminders: [],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <div className="main-wrapper">
        <WrapperDiv className="app-wrapper">
          <div className="main-title-wrapper">
            <div className="main-title">reminder</div>
            <AddIcon className="add group" onClick={groupAddClickHandler} />
          </div>
          <List className="groups-list">
            {/* //TODO - add group list rendering */}
            {getGroups()}
          </List>
        </WrapperDiv>
      </div>
    </ThemeProvider>
  );
};

export default Reminder;
