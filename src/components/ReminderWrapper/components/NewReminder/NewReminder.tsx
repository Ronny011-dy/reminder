import { ListItem, Checkbox, IconButton } from '@mui/material';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { Root } from './NewReminder.styles';

type NewReminderProps = {};

const NewReminder: React.FC<NewReminderProps> = () => {
  return (
    <Root>
      <ListItem
        secondaryAction={
          <IconButton>
            <AddTaskRoundedIcon />
          </IconButton>
        }
      >
        <Checkbox disabled />
        <input />
      </ListItem>
    </Root>
  );
};

export { NewReminder };
