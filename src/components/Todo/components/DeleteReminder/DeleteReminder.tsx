import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { useReminderIdContext } from '../../../../routes/ReminderWrapper/hooks/useReminderIdContext';
import { useQueryDelete } from '../../../../api/reactQueryMutations';

type DeleteReminderProps = {
  subReminders: string[];
};

const DeleteReminder: React.FC<DeleteReminderProps> = ({ subReminders }) => {
  const id = useReminderIdContext();
  const mutation = useQueryDelete();

  const deletehandler = () => {
    // first delete sub reminders
    subReminders.forEach((sub) => mutation.mutate({ id: sub }));
    mutation.mutate({ id });
  };

  return (
    <OptionWrapper
      title="Delete reminder"
      onClick={deletehandler}
    >
      <DeleteTwoToneIcon />
    </OptionWrapper>
  );
};

export { DeleteReminder };
