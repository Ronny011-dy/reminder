import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { useCurrentReminderContext } from '../../../../routes/ReminderWrapper/hooks/useCurrentReminderContext';
import { useDebouncedRemindersDeletion, useQueryDelete } from '../../../../api/reactQueryMutations';
import { flat } from '../../../../routes/ReminderWrapper/utils/ReminderWrapper.util';
import { useQueryClient } from 'react-query';

interface DeleteReminder {
  isChild?: boolean;
  setParentID: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const DeleteReminder: React.FC<DeleteReminder> = ({ isChild, setParentID }) => {
  const queryClient = useQueryClient();
  const subReminderDeleteMutation = useQueryDelete();
  const addReminderToDelete = useDebouncedRemindersDeletion();
  const { id, ...restOfCurrentReminder } = useCurrentReminderContext();

  const deletehandler = async () => {
    // first delete sub reminders
    if (!isChild) {
      const subreminders = flat(queryClient.getQueryData(['subreminders', id]));
      subreminders.length > 0 && subreminders.forEach((subreminder) => subReminderDeleteMutation.mutate(subreminder));
    }
    await addReminderToDelete({ id, ...restOfCurrentReminder });
    setParentID(undefined);
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
