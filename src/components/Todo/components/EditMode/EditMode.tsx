import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import { Dialog, TextField, DialogContent, DialogActions } from '@mui/material';
import { useState } from 'react';
import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { useReminderIdContext } from '../../../../routes/ReminderWrapper/hooks/useReminderIdContext';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';
import { updateReminderDB } from '../../../../api/functions.api';

type EditModeProps = { reminderText: string };

const EditMode: React.FC<EditModeProps> = ({ reminderText }) => {
  const id = useReminderIdContext();
  const mutation = useQueryClientAndMutation(updateReminderDB, 'Update');
  const [title, setTitle] = useState(reminderText);
  const [isEditing, setIsEditing] = useState(false);
  const editHandler = () => setIsEditing(true);
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
  const onSave = () => {
    mutation.mutate({ id, req: { title: title } });
    setTimeout(() => {
      setTitle(title);
    }, 150);
    setIsEditing(false);
  };
  return (
    <>
      <OptionWrapper onClick={editHandler} title="Edit reminder">
        <EditTwoToneIcon />
      </OptionWrapper>
      <Dialog open={isEditing} onClose={handleClose}>
        <DialogContent>
          <TextField
            label="Edit reminder"
            variant="outlined"
            value={title}
            onChange={textChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <OptionWrapper
            title="Save reminder"
            disabled={title === '' || title === reminderText}
            onClick={onSave}
          >
            <SaveTwoToneIcon />
          </OptionWrapper>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { EditMode };
