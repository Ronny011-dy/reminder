import { Root } from './Header.styles';
import { CreateReminder } from './components/CreateReminder/CreateReminder';

type HeaderProps = {
  onCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ onCreate }) => {
  return (
    <Root>
      <CreateReminder onCreate={onCreate} />
    </Root>
  );
};

export { Header };
