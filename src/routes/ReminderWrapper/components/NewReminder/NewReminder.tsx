import { useTheme } from '@mui/material';
import { IconButton, Tooltip } from '@mui/material';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { Root, StyledListItem } from './NewReminder.styles';
import { useState, forwardRef } from 'react';
import { useQueryCreate } from '../../../../api/reactQueryMutations';

import { v4 as uuidv4 } from 'uuid';

type NewReminderProps = {
  onSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  noReminders: boolean;
};

const NewReminder = forwardRef<HTMLDivElement, NewReminderProps>(({ onSubmit, noReminders }, ref) => {
  const theme = useTheme();
  const mutation = useQueryCreate();
  const [title, setTitle] = useState('');

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    mutation.mutate({
      id: uuidv4(),
      title,
      createdDate: String(Date.now()),
      parentID: null,
      done: false,
      description: '',
      important: false,
      tags: '[]'
    });
    !mutation.isSuccess && onSubmit(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit();
    }
  };
  return (
    <Root ref={ref}>
      <form onSubmit={handleSubmit}>
        <StyledListItem
          $noReminders={noReminders}
          theme={theme}
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
        </StyledListItem>
      </form>
    </Root>
  );
});

export { NewReminder };
