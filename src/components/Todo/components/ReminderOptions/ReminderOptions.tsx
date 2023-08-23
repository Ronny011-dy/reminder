import { Root } from './ReminderOptions.styles.ts';
import { ButtonGroup } from '@mui/material';
import { DeleteReminder } from '../DeleteReminder/DeleteReminder';
import { ImportantToggle } from '../ImportantToggle/ImportantToggle';
import { AddSubReminder } from '../AddSubReminder/AddSubReminder';
import { useReminderDoneContext } from '../../hooks/useReminderDoneContext.ts';

type ReminderOptionsProps = {
  important: boolean;
  subReminderIds: string[];
  setSubReminderIds: React.Dispatch<React.SetStateAction<string[]>>;
  isChild: boolean;
  isSelected: boolean;
  title: string;
  date?: number;
};

const ReminderOptions: React.FC<ReminderOptionsProps> = ({
  important,
  subReminderIds,
  setSubReminderIds,
  isChild,
  isSelected,
  title,
  date
}) => {
  const done = useReminderDoneContext();
  return (
    <Root>
      <ButtonGroup>
        {(isSelected || important) && <ImportantToggle important={important} />}
        {/* sub reminders can't have their own sub reminders */}
        {/* {{!done && !isChild && isSelected && (
          <AddSubReminder setSubReminderIds={setSubReminderIds} />
        )} } */}
        <DeleteReminder subReminderIds={subReminderIds} />
      </ButtonGroup>
    </Root>
  );
};

export { ReminderOptions };
