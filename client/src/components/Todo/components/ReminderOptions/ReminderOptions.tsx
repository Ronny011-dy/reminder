import { Root } from './ReminderOptions.styles.ts';
import { ButtonGroup } from '@mui/material';
import { DeleteReminder } from '../DeleteReminder/DeleteReminder';
import { ImportantToggle } from '../ImportantToggle/ImportantToggle';

type ReminderOptionsProps = {
  important: boolean;
  isChild?: boolean;
  isSelected: boolean;
  setParentID: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const ReminderOptions: React.FC<ReminderOptionsProps> = ({ important, isSelected, isChild, setParentID }) => {
  return (
    <Root>
      <ButtonGroup>
        {(isSelected || important) && <ImportantToggle />}
        <DeleteReminder
          isChild={isChild}
          setParentID={setParentID}
        />
      </ButtonGroup>
    </Root>
  );
};

export { ReminderOptions };
