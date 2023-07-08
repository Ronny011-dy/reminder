import { v4 as uuidv4 } from 'uuid';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';

import { OptionWrapper } from '../option-wrapper/option-wrapper';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';
import { addNewReminderDB } from '../../../../api/functions.api';
import { useReminderIdContext } from '../../../reminder-wrapper/hooks/useReminderIdContext';

type AddSubReminderProps = {
  subSetter: React.Dispatch<React.SetStateAction<string[]>>;
  isChild: boolean;
};

const AddSubReminder: React.FC<AddSubReminderProps> = ({
  subSetter,
  isChild,
}) => {
  const parentId = useReminderIdContext();
  const id = uuidv4();
  // create a reminder and assign it with a parentID
  const mutation = useQueryClientAndMutation(addNewReminderDB, 'Create', true);

  const subAddhandler = () => {
    mutation.mutate({ id, parentId });
    subSetter((current) => [...current, id]);
  };

  if (isChild) return null;
  return (
    <OptionWrapper title="Add sub-reminder" onClick={subAddhandler}>
      <ChecklistRoundedIcon className="add-sub-reminder" />
    </OptionWrapper>
  );
};

export { AddSubReminder };
