import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { useCurrentReminderContext } from '../../../../routes/ReminderWrapper/hooks/useCurrentReminderContext';
import { useQueryDelete } from '../../../../api/reactQueryMutations';

type DeleteReminderProps = {
  subReminderIds: string[];
};

const DeleteReminder: React.FC<DeleteReminderProps> = ({ subReminderIds }) => {
  const id = useCurrentReminderContext();
  const mutation = useQueryDelete();

  const deletehandler = () => {
    // first delete sub reminders
    subReminderIds.forEach((sub) => mutation.mutate({ id: sub }));
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
