import styled from 'styled-components';

import TextInput from '../text-input/text-input.component';

import Radio from '@mui/material/Radio';
// import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

// type Reminder = {
//     done: boolean;
//     title: string;
//     description: string;
//     tags: Array<string>;
//     createdDate?: number;
//     date?: number;
//     important: boolean;
//     parentID?: number;
//   }

const ReminderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .action {
    height: 15px;
    margin-left: 5px;
    color: gray;
    &:hover {
      color: black;
      filter: drop-shadow(0px 0px 1px #ffffff) drop-shadow(0px 0px 1px #ffffff)
        drop-shadow(0px 0px 1px #ffffff);
    }
  }
`;

type Reminder = {
  id: string;
  done?: boolean;
  title: string;
  description?: string;
  tags?: Array<string>;
  createdDate: number;
  date?: number;
  important?: boolean; // will be used to color the radio accordingly
  parentID?: number;
  deleteHandler?: (id: string) => void;
  completeHandler?: (id: string) => void; // only relevant for uncompleted reminders, but we have to pass it because onClick can't take undefined
};

const Todo: React.FC<Reminder> = (props) => {
  const reminderDeleteHandler = () => {
    // props.deleteHandler(props.id);
  };

  const reminderCompleteHandler = () => {
    // props.done || props.completeHandler(props.id);
  };

  return (
    <ReminderDiv className="reminder">
      <Radio checked={props.done} onChange={reminderCompleteHandler} />
      <TextInput title="" />
      <DeleteRoundedIcon
        className="action delete"
        onClick={reminderDeleteHandler}
      />
    </ReminderDiv>
  );
};

export default Todo;
