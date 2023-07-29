import { Root } from './App.styles';
import { ReminderWrapper } from './components/ReminderWrapper/ReminderWrapper';
import { Theme } from './components/Theme/Theme';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { useState } from 'react';

const App: React.FC = () => {
  const [newReminderOpen, setNewReminderOpen] = useState(false);
  return (
    <Root>
      <Theme>
        <Header onCreate={setNewReminderOpen} />
        <ReminderWrapper
          addingNewReminder={newReminderOpen}
          onNewReminderClickAway={setNewReminderOpen}
        />
        <Footer />
      </Theme>
    </Root>
  );
};

export { App };
