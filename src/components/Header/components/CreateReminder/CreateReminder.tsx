import { Root, IconButtonStyled } from './CreateReminder.styles.ts';

import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material';

type CreateReminderProps = {
  onCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateReminder: React.FC<CreateReminderProps> = ({ onCreate }) => {
  const theme = useTheme();
  return (
    <Root>
      reminder
      <IconButtonStyled theme={theme} onClick={() => onCreate(true)}>
        <AddIcon />
      </IconButtonStyled>
    </Root>
  );
};

export { CreateReminder };
