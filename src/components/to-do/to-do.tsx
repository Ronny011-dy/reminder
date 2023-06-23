import * as React from 'react';
import { styled } from '@mui/material/styles';

import type { Reminder } from './types';
import { ReminderStyling } from './to-do.styles';

import TextInput from '../text-input/text-input';

import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Radio from '@mui/material/Radio';
import ListItemText from '@mui/material/ListItemText';
// import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import Stack from '@mui/material/Stack';

type TagData = {
  key: number;
  label: string;
};

const Todo: React.FC<Reminder> = ({
  done,
  title,
  description,
  tags,
  createdDate,
  date,
  important,
}) => {
  const [tagData, setTagData] = React.useState<TagData[]>([
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const handleDelete = (tagToDelete: TagData) => () => {
    setTagData((tags) => tags.filter((tag) => tag.key !== tagToDelete.key));
  };

  const reminderDeleteHandler = () => {
    // props.deleteHandler(props.id);
  };

  const reminderCompleteHandler = () => {
    // props.done || props.completeHandler(props.id);
  };

  return (
    <ReminderStyling>
      <ListItem
        disablePadding
        secondaryAction={
          <ButtonGroup>
            <Tooltip
              title="Add sub-reminder"
              followCursor
              enterDelay={500}
              leaveDelay={200}
            >
              <IconButton>
                <ChecklistRoundedIcon className="add-sub-reminder" />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Delete reminder"
              followCursor
              enterDelay={500}
              leaveDelay={200}
            >
              <IconButton>
                <DeleteRoundedIcon
                  className="delete-reminder"
                  onClick={reminderDeleteHandler}
                />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        }
      >
        <ListItemIcon>
          <Radio checked={done} onChange={reminderCompleteHandler} />
        </ListItemIcon>
        <TextInput title={title} />
        <TextInput title={description} secondary />
        <Stack direction="row" spacing={0.8}>
          {tagData.map((data) => {
            return (
              <ListItem key={data.key} className="chip">
                <Chip
                  label={data.label}
                  onDelete={handleDelete(data)}
                  size="small"
                />
              </ListItem>
            );
          })}
        </Stack>
      </ListItem>
    </ReminderStyling>
  );
};

export default Todo;
