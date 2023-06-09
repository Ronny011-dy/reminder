import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { deleteReminderDB } from '../../../../api/functions.api';
import { useReminderIdContext } from '../../../ReminderWrapper/hooks/useReminderIdContext';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';

type DeleteReminderProps = {
  subReminders?: string[];
};

const DeleteReminder: React.FC<DeleteReminderProps> = ({ subReminders }) => {
  const id = useReminderIdContext();
  const mutation = useQueryClientAndMutation(deleteReminderDB, 'Delete');

  const deletehandler = () => {
    // first delete sub reminders
    subReminders && subReminders.map((sub) => mutation.mutate({ id: sub }));
    mutation.mutate({ id });
  };

  return (
    <OptionWrapper title="Delete reminder" onClick={deletehandler} dontDisable>
      <DeleteRoundedIcon />
    </OptionWrapper>
  );
};

export { DeleteReminder };
