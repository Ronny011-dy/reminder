import { ReactElement, useState } from 'react';

//generate random IDs deterministic agents like crawlers can cause duplicates
// import { v4 as uuidv4 } from 'uuid';

import styled from 'styled-components';

import AddIcon from '@mui/icons-material/Add';
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';

import Todo from '../to-do/to-do.component';
import TextInput from '../text-input/text-input.component';

const GroupDiv = styled.div`
  display: flex;
  flex-direction: column;
  .group-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    .action {
      height: 15px;
      margin-left: 5px;
      color: gray;
      &:hover {
        color: black;
        filter: drop-shadow(0px 0px 1px #ffffff)
          drop-shadow(0px 0px 1px #ffffff) drop-shadow(0px 0px 1px #ffffff);
      }
    }
  }
`;

type GroupProps = {
  id: string;
  title?: string;
  completed?: boolean;
  ungrouped?: boolean;
  reminders: (id: string) => ReactElement[];
  globalRemindersAddHandler: (groupID: string) => void;
};

const Group: React.FC<GroupProps> = (props) => {
  const [remindersList, setReminderList] = useState<ReactElement[]>([]);

  const reminderParseHandler = () => props.reminders(props.id);

  //TODO - Add new add button handling that considers new data type. We need to update the overall reminderGroupArr state that's up in the reminders component
  const reminderAddHandler = () => {
    props.globalRemindersAddHandler(props.id);
  };

  //TODO
  const reminderDeleteHandler = (reminderID: string) => {
    setReminderList(remindersList.filter((r) => r.key !== reminderID));
  };
  //TODO
  const reminderCompleteHandler = (reminderID: string) => {
    // setcompletedRemindersList(
    //   completedRemindersList.concat(
    //     <Todo
    //       key={reminderID}
    //       id={reminderID}
    //       title=""
    //       done
    //       createdDate={Date.now()}
    //       deleteHandler={reminderDeleteHandler}
    //       completeHandler={reminderCompleteHandler}
    //     />
    //   )
    // );
    reminderDeleteHandler(reminderID);
  };
  //TODO
  const restoreHandler = () => {
    alert('reminders restored');
  };

  return (
    <GroupDiv
      className={`group${props.completed ? ` completed` : ''}${
        props.ungrouped ? ` ungrouped` : ''
      }`}
    >
      <div className="group-title">
        {/* completed and ungrouped are hardcoded group titles */}
        {props.title || <TextInput title="" group />}
        {props.completed ? (
          <RestoreRoundedIcon
            className="action restore"
            onClick={restoreHandler}
          />
        ) : props.ungrouped ? (
          ''
        ) : (
          <AddIcon className="action add" onClick={reminderAddHandler} />
        )}
      </div>{' '}
      {reminderParseHandler()}
    </GroupDiv>
  );
};

export default Group;
