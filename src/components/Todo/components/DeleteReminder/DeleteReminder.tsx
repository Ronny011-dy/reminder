import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { deleteReminderDB } from '../../../../api/functions.api';
import { useReminderIdContext } from '../../../../routes/ReminderWrapper/hooks/useReminderIdContext';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';

type DeleteReminderProps = {
  subReminders: string[];
};

const DeleteReminder: React.FC<DeleteReminderProps> = ({ subReminders }) => {
  const id = useReminderIdContext();
  const mutation = useQueryClientAndMutation(deleteReminderDB, 'Delete');

  const deletehandler = () => {
    // first delete sub reminders
    subReminders.forEach((sub) => mutation.mutate({ id: sub }));
    mutation.mutate({ id });
  };

  return (
    <OptionWrapper title="Delete reminder" onClick={deletehandler}>
      <DeleteTwoToneIcon />
    </OptionWrapper>
  );
};

export { DeleteReminder };
