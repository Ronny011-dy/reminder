import { useTheme } from '@mui/material';
import { Root } from './Header.styles';
import { CreateReminder } from './components/CreateReminder/CreateReminder';

type HeaderProps = {
  onCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ onCreate }) => {
  const theme = useTheme();
  return (
    <Root theme={theme}>
      <div>
        <CreateReminder onCreate={onCreate} />
      </div>
    </Root>
  );
};

export { Header };
