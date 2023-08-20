import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import { Dialog, DialogContent, DialogActions } from '@mui/material';
import { useState, useRef } from 'react';
import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { useReminderIdContext } from '../../../../routes/ReminderWrapper/hooks/useReminderIdContext';
import { useQueryUpdate } from '../../../../api/reactQueryMutations';
import { Root, InputStyled, ContentStyled } from './EditMode.styles';
import { useFocus } from '../../../../hooks/useFocus';

type EditModeProps = { reminderText: string };

const EditMode: React.FC<EditModeProps> = ({ reminderText }) => {
  const id = useReminderIdContext();
  const mutation = useQueryUpdate();
  const [title, setTitle] = useState(reminderText);
  const [isEditing, setIsEditing] = useState(false);
  const cantSave = title === '' || title.length >= 100;
  const onSave = () => {
    title !== reminderText && mutation?.mutate({ id: id, req: { title: title } });
    setTimeout(() => {
      setTitle(title);
    }, 150);
    setIsEditing(false);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      !cantSave && onSave();
    }
  };
  // state of dialog open
  const inputRef = useRef<HTMLInputElement | null>(null);

  useFocus({
    inputRef,
    elementRendered: isEditing
  });

  const handleClose = () => {
    setIsEditing(false);
    // fill in the value from the DB if the field was cleared and the dialog is then closed
    setTimeout(() => {
      reminderText !== title && setTitle(reminderText);
    }, 150);
  };
  const textChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // basic validation of title
  const error = title === '' ? 'Please enter a valid title' : title.length >= 100 ? 'Title is over 100 characters' : '';
  return (
    <Root>
      <OptionWrapper
        onClick={() => setIsEditing(true)}
        title="Edit reminder"
      >
        <EditTwoToneIcon />
      </OptionWrapper>
      <Dialog
        open={isEditing}
        onClose={handleClose}
      >
        <DialogContent>
          <ContentStyled>
            <h3>Edit reminder</h3>
            <InputStyled
              value={title}
              onChange={textChangeHandler}
              ref={inputRef}
              type="text"
              onKeyDown={handleKeyDown}
              maxLength={100}
            />
            <p>{error}</p>
          </ContentStyled>
        </DialogContent>
        <DialogActions>
          <OptionWrapper
            title="Save reminder"
            disabled={cantSave}
            onClick={onSave}
          >
            <SaveTwoToneIcon />
          </OptionWrapper>
        </DialogActions>
      </Dialog>
    </Root>
  );
};

export { EditMode };
