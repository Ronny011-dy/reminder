import { ListItem, Checkbox, IconButton, Tooltip } from '@mui/material';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { Root } from './NewReminder.styles';
import { useState, forwardRef } from 'react';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';
import { addNewReminderDB } from '../../../../api/functions.api';

import { v4 as uuidv4 } from 'uuid';

type NewReminderProps = {
  onSubmit: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewReminder = forwardRef<HTMLDivElement, NewReminderProps>(
  ({ onSubmit }, ref) => {
    const mutation = useQueryClientAndMutation(addNewReminderDB, 'Create');
    const [title, setTitle] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      mutation.mutate({ id: uuidv4(), title: title });
      !mutation.isSuccess && onSubmit(false);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') handleSubmit;
    };

    return (
      <Root ref={ref}>
        <form onSubmit={handleSubmit}>
          <ListItem
            secondaryAction={
              <Tooltip
                title="Add reminder"
                enterDelay={650}
                enterNextDelay={650}
              >
                <IconButton type="submit">
                  <AddTaskRoundedIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <Checkbox disabled />
            <input
              autoFocus
              type="text"
              required
              placeholder="Enter reminder"
              minLength={1}
              value={title}
              onChange={handleTitleChange}
              onKeyDown={handleKeyDown}
            />
          </ListItem>
        </form>
      </Root>
    );
  }
);

export { NewReminder };
