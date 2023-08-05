import { Root } from './CreateReminder.styles.ts';

import AddIcon from '@mui/icons-material/Add';
import { HeaderButton } from '../../../HeaderButton/HeaderButton.tsx';

type CreateReminderProps = {
  onCreate?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateReminder: React.FC<CreateReminderProps> = ({ onCreate }) => {
  return (
    <Root>
      <HeaderButton onClick={() => onCreate && onCreate(true)}>
        <AddIcon />
        Create a reminder
      </HeaderButton>
    </Root>
  );
};

export { CreateReminder };
