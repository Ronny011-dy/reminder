import { ButtonGroup } from '@mui/material';

import { DeleteReminder } from '../DeleteReminder/DeleteReminder';
import { ImportantToggle } from '../ImportantToggle/ImportantToggle';
import { AddSubReminder } from '../AddSubReminder/AddSubReminder';
import { EditMode } from '../EditMode/EditMode';

type ReminderOptionsProps = {
  important: boolean;
  subState: string[];
  subSetter: React.Dispatch<React.SetStateAction<string[]>>;
  isChild: boolean;
  isSelected: boolean;
  reminderText: string;
};

const ReminderOptions: React.FC<ReminderOptionsProps> = ({
  important,
  subState,
  subSetter,
  isChild,
  isSelected,
  reminderText,
}) => {
  return (
    <ButtonGroup>
      {isSelected && <EditMode reminderText={reminderText} />}
      {isSelected && <ImportantToggle important={important} />}
      {/* sub reminders can't have their own sub reminders */}
      {!isChild && isSelected && <AddSubReminder subSetter={subSetter} />}
      <DeleteReminder subReminders={subState} />
    </ButtonGroup>
  );
};

export { ReminderOptions };
