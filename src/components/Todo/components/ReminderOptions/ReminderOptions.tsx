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
  subState: string[];
  subSetter: React.Dispatch<React.SetStateAction<string[]>>;
  isChild: boolean;
  isSelected: boolean;
  reminderText: string;
  date?: number;
  tags: string[];
  isHidden: boolean;
  hideHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReminderOptions: React.FC<ReminderOptionsProps> = ({
  important,
  subState,
  subSetter,
  isChild,
  isSelected,
  reminderText,
  date,
  tags,
  hideHandler,
  isHidden,
}) => {
  const done = useReminderDoneContext();
  return (
    <Root>
      <ButtonGroup>
        {isSelected && (
          <Tags
            date={date}
            tags={tags}
            isReminderTextHidden={isHidden}
            hideTextOnExpand={hideHandler}
          />
        )}
        {!done && isSelected && <EditMode reminderText={reminderText} />}
        {isSelected && <ImportantToggle important={important} />}
        {/* sub reminders can't have their own sub reminders */}
        {/* {!done && !isChild && isSelected && (
          <AddSubReminder subSetter={subSetter} />
        )} */}
        <DeleteReminder subReminders={subState} />
      </ButtonGroup>
    </Root>
  );
};

export { ReminderOptions };
