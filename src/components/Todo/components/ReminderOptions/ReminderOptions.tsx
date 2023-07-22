import { ButtonGroup } from '@mui/material';

import { DeleteReminder } from '../DeleteReminder/DeleteReminder';
import { ImportantToggle } from '../ImportantToggle/ImportantToggle';
import { AddSubReminder } from '../AddSubReminder/AddSubReminder';

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
      {/* sub reminders can't have their own sub reminders */}
      <ImportantToggle important={important} />
      <AddSubReminder subSetter={subSetter} isChild={isChild} />
      <DeleteReminder subReminders={subState} />
    </ButtonGroup>
  );
};

export { ReminderOptions };
