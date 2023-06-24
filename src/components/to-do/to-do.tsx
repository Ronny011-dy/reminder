import React from 'react';
import { useState } from 'react';

import type { Reminder } from './types';
import { ReminderStyling } from './to-do.styles';

import { TextInput } from '../text-input/text-input';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

import {
  Chip,
  Tooltip,
  ButtonGroup,
  IconButton,
  ListItem,
  ListItemIcon,
  Radio,
  Stack,
} from '@mui/material';

import { idGenerator } from '../../utils/funcs.util';
import { DatePicker } from '../date-picker/date-picker';

const Todo: React.FC<Reminder> = ({
  done,
  title,
  description,
  tags,
  createdDate,
  date,
  important,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const addTagHandler = () => setIsAdding(true);
  const acceptTagHandler = () => {
    setIsAdding(false);
  };

  const handleTagDelete = (tagToDelete: number) => () => {
    // setTagData((tags) => tags.filter((tag) => tag.key !== tagToDelete.key));
    //TODO
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
              title={important ? 'Unmark as important' : 'Mark as important'}
              followCursor
              enterDelay={650}
              leaveDelay={200}
            >
              <IconButton>
                {important ? (
                  <ErrorRoundedIcon />
                ) : (
                  <ErrorOutlineRoundedIcon className="secondary" />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Add sub-reminder"
              followCursor
              enterDelay={650}
              leaveDelay={200}
            >
              <IconButton>
                <ChecklistRoundedIcon className="add-sub-reminder" />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Delete reminder"
              followCursor
              enterDelay={650}
              leaveDelay={200}
            >
              <IconButton onClick={reminderDeleteHandler}>
                <DeleteRoundedIcon className="delete-reminder" />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        }
      >
        <ListItemIcon>
          <Radio checked={done} onChange={reminderCompleteHandler} />
        </ListItemIcon>
        <TextInput title={title} isTag placeholder="Enter reminder" />
        <TextInput
          title={description}
          secondary
          isTag
          placeholder="Enter description"
        />
        <Stack className="tags" direction="row" spacing={0.6}>
          <Chip
            label="Add tag"
            variant="outlined"
            size="small"
            onClick={addTagHandler}
          />
          {isAdding && (
            <TextInput
              title=""
              placeholder="Enter tag"
              accept={acceptTagHandler}
            />
          )}
          {tags.map((tag, index) => {
            return (
              <Chip
                key={idGenerator()}
                label={tag}
                onDelete={handleTagDelete(index)}
                size="small"
              />
            );
          })}
          <DatePicker date={date} />
        </Stack>
      </ListItem>
    </ReminderStyling>
  );
};

export { Todo };
