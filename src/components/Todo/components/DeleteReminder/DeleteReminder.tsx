import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { useCurrentReminderContext } from '../../../../routes/ReminderWrapper/hooks/useCurrentReminderContext';
import { useDebouncedRemindersDeletion } from '../../../../api/reactQueryMutations';
import { useQuery, useQueryClient } from 'react-query';

type DeleteReminderProps = {
  subReminderIds: string[];
};

const DeleteReminder: React.FC<DeleteReminderProps> = ({ subReminderIds }) => {
  // const mutation = useQueryDelete();
  // const queryClient = useQueryClient();
  const addReminderToDelete = useDebouncedRemindersDeletion();
  const { id, ...restOfCurrentReminder } = useCurrentReminderContext();

  const deletehandler = async () => {
    // first delete sub reminders
    // subReminderIds.forEach((sub) => mutation.mutate({id,...restOfCurrentReminder,req:{ id: sub }}));
    // mutation.mutate({ id, ...restOfCurrentReminder });
    await addReminderToDelete({ id, ...restOfCurrentReminder });
    // fire only one invalidation instead of per delete
    // queryClient.invalidateQueries({ queryKey: ['reminders'] });
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
