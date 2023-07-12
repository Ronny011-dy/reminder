import { Root } from './App.styles';
import { ReminderWrapper } from './components/ReminderWrapper/ReminderWrapper';
import { Theme } from './components/Theme/Theme';

const App: React.FC = () => {
  return (
    <Root>
      <Theme>
        <header>Header</header>
        <ReminderWrapper />
        <footer>Footer</footer>
      </Theme>
    </Root>
  );
};

export { App };
