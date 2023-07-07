import { Root } from './App.styles';
import { ReminderWrapper } from './components/reminder-wrapper/reminder-wrapper';
import { Theme } from './components/theme/theme';

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
