import { ClickAwayListener, useTheme } from '@mui/material';
import { IconButton } from '@mui/material';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { Root, StyledListItem } from './NewReminder.styles';
import { useState, forwardRef, useRef } from 'react';
import { useQueryCreate } from '../../../../api/reactQueryMutations';

import { v4 as uuidv4 } from 'uuid';
import { ArrowTooltip } from '../../../../components/ArrowTooltip/ArrowTooltip';

interface NewReminderProps {
  setNewReminderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noReminders: boolean;
}

const NewReminder = forwardRef<HTMLDivElement, NewReminderProps>(({ setNewReminderOpen, noReminders }, ref) => {
  const theme = useTheme();
  const mutation = useQueryCreate();
  const [title, setTitle] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    mutation.mutate({
      id: uuidv4(),
      title,
      createdDate: String(Date.now()),
      orderID: String(Date.now()),
      parentID: null,
      done: false,
      description: '',
      important: false,
      tags: '[]',
      date: null
    });
    setTitle('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      formRef.current?.reportValidity() && handleSubmit();
    }
  };

  const handleClickAway = () => {
    if (title === '') setNewReminderOpen(false);
    else formRef.current?.reportValidity() && handleSubmit();
    setNewReminderOpen(false);
  };

  return (
    <Root>
      <ClickAwayListener onClickAway={handleClickAway}>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <StyledListItem
            $noReminders={noReminders}
            theme={theme}
            secondaryAction={
              <ArrowTooltip title="Add reminder">
                <IconButton type="submit">
                  <AddTaskRoundedIcon />
                </IconButton>
              </ArrowTooltip>
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
      </ClickAwayListener>
    </Root>
  );
});

export { NewReminder };
