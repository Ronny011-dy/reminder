import { v4 as uuidv4 } from 'uuid';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';

import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';
import { addNewReminderDB } from '../../../../api/functions.api';
import { useReminderIdContext } from '../../../ReminderWrapper/hooks/useReminderIdContext';

//TODO: add subreminder NewReminder component

type AddSubReminderProps = {
  subSetter: React.Dispatch<React.SetStateAction<string[]>>;
  isChild: boolean;
};

const AddSubReminder: React.FC<AddSubReminderProps> = ({
  subSetter,
  isChild,
}) => {
  const parentID = useReminderIdContext();
  const id = uuidv4();
  // create a reminder and assign it with a parentID
  const mutation = useQueryClientAndMutation(addNewReminderDB, 'Create');

  const subAddhandler = () => {
    mutation.mutate({ id, parentID });
    subSetter((current) => [...current, id]);
  };

  if (isChild) return null;
  return (
    <OptionWrapper title="Add sub-reminder" onClick={subAddhandler}>
      <ChecklistRoundedIcon />
    </OptionWrapper>
  );
};

export { AddSubReminder };
