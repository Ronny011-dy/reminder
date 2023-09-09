import { ClickAwayListener, useTheme } from '@mui/material';
import { IconButton } from '@mui/material';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { Root, StyledListItem, StyledWrapper } from './NewReminder.styles';
import { useState, useRef } from 'react';
import { useQueryCreate } from '../../../../api/reactQueryMutations';
import AddIcon from '@mui/icons-material/Add';

import { v4 as uuidv4 } from 'uuid';
import { ArrowTooltip } from '../../../../components/ArrowTooltip/ArrowTooltip';
import { HeaderButton } from '../../../../components/HeaderButton/HeaderButton';

interface NewReminderProps {
  noReminders?: boolean;
  isChild?: boolean;
  parentID?: string;
  setClickAwayShouldHide: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewReminder: React.FC<NewReminderProps> = ({ noReminders, isChild, parentID, setClickAwayShouldHide }) => {
  const theme = useTheme();
  const mutation = useQueryCreate();
  const [title, setTitle] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [newReminderOpen, setNewReminderOpen] = useState(false);

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
    isChild && setClickAwayShouldHide(true);
    if (title === '') setNewReminderOpen(false);
    else formRef.current?.reportValidity() && handleSubmit();
    setNewReminderOpen(false);
  };

  const handleCreateClick = () => {
    setNewReminderOpen(true);
    setClickAwayShouldHide(false);
  };
  return (
    <Root shouldHide={isChild && !Boolean(parentID)}>
      {!newReminderOpen && (
        <HeaderButton
          onClick={handleCreateClick}
          nonheader
        >
          <AddIcon />
          {isChild ? 'Create a subreminder' : 'Create a reminder'}
        </HeaderButton>
      )}
      {newReminderOpen && (
        <StyledWrapper onClick={() => inputRef.current?.focus()}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <form
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <StyledListItem
                $noReminders={noReminders}
                theme={theme}
                secondaryAction={
                  <ArrowTooltip title={isChild ? 'Add a subreminder' : 'Add a reminder'}>
                    <IconButton type="submit">
                      <AddTaskRoundedIcon />
                    </IconButton>
                  </ArrowTooltip>
                }
              >
                <input
                  ref={inputRef}
                  autoFocus
                  type="text"
                  required
                  placeholder={isChild ? 'Enter a subreminder' : 'Enter a reminder'}
                  minLength={1}
                  value={title}
                  onChange={handleTitleChange}
                  onKeyDown={handleKeyDown}
                />
              </StyledListItem>
            </form>
          </ClickAwayListener>
        </StyledWrapper>
      )}
    </Root>
  );
};
