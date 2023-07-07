import { ButtonGroup } from '@mui/material';

import { DeleteReminder } from '../delete-reminder/delete-reminder';
import { ImportantToggle } from '../important-toggle/important-toggle';
import { AddSubReminder } from '../add-sub-reminder/add-sub-reminder';

type ReminderOptionsProps = {
  important: boolean;
  subState: string[];
  subSetter: React.Dispatch<React.SetStateAction<string[]>>;
  isChild: boolean;
};

const ReminderOptions: React.FC<ReminderOptionsProps> = ({
  important,
  subState,
  subSetter,
  isChild,
}) => {
  return (
    <ButtonGroup>
      <ImportantToggle important={important} />
      <AddSubReminder subSetter={subSetter} isChild={isChild} />
      <DeleteReminder subReminders={subState} />
    </ButtonGroup>
  );
};

export { ReminderOptions };
