import { v4 as uuidv4 } from 'uuid';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';

import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { addNewReminder } from '../../../../api/reminders';
import { useCurrentReminderContext } from '../../../../routes/ReminderWrapper/hooks/useCurrentReminderContext';
import { useQueryCreate } from '../../../../api/reactQueryMutations';

//TODO: add subreminder NewReminder component

type AddSubReminderProps = {
  setSubReminderIds: React.Dispatch<React.SetStateAction<string[]>>;
};

const AddSubReminder: React.FC<AddSubReminderProps> = ({ setSubReminderIds }) => {
  const parentID = useCurrentReminderContext();
  const id = uuidv4();
  // create a reminder and assign it with a parentID
  const mutation = useQueryCreate();

  const subAddhandler = () => {
    mutation.mutate({ id, parentID });
    setSubReminderIds((current) => [...current, id]);
  };

  return (
    <OptionWrapper
      title="Add sub-reminder"
      onClick={subAddhandler}
    >
      <ChecklistRoundedIcon />
    </OptionWrapper>
  );
};

export { AddSubReminder };
