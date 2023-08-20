import { Root } from './ReminderOptions.styles.ts';
import { ButtonGroup } from '@mui/material';
import { DeleteReminder } from '../DeleteReminder/DeleteReminder';
import { ImportantToggle } from '../ImportantToggle/ImportantToggle';
import { AddSubReminder } from '../AddSubReminder/AddSubReminder';
import { EditMode } from '../EditMode/EditMode';
import { Tags } from '../Tags/Tags';
import { useReminderDoneContext } from '../../hooks/useReminderDoneContext.ts';

type ReminderOptionsProps = {
  important: boolean;
  subReminders: string[];
  setSubReminders: React.Dispatch<React.SetStateAction<string[]>>;
  isChild: boolean;
  isSelected: boolean;
  title: string;
  date?: number;
};

const ReminderOptions: React.FC<ReminderOptionsProps> = ({
  important,
  subReminders,
  setSubReminders,
  isChild,
  isSelected,
  title,
  date
}) => {
  const done = useReminderDoneContext();
  return (
    <Root>
      <ButtonGroup>
        {!done && isSelected && <EditMode reminderText={title} />}
        {isSelected && <ImportantToggle important={important} />}
        {/* sub reminders can't have their own sub reminders */}
        {/* {!done && !isChild && isSelected && (
          <AddSubReminder setSubReminders={setSubReminders} />
        )} */}
        <DeleteReminder subReminders={subReminders} />
      </ButtonGroup>
    </Root>
  );
};

export { ReminderOptions };
