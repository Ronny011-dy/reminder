import { Root } from './App.styles';
import { ReminderWrapper } from './components/ReminderWrapper/ReminderWrapper';
import { Theme } from './components/Theme/Theme';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <Root>
      <Theme>
        <Header />
        <ReminderWrapper />
        <Footer />
      </Theme>
    </Root>
  );
};

export { App };
