import { Root } from './Header.styles';
import { CreateReminder } from './components/CreateReminder/CreateReminder';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <Root>
      <CreateReminder />
    </Root>
  );
};

export { Header };
