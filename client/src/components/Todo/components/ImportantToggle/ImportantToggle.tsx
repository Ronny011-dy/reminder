import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { useCurrentReminderContext } from '../../../../routes/ReminderWrapper/hooks/useCurrentReminderContext';

import { ImportantStyled } from './ImportantToggle.styles';
import { useQueryUpdate } from '../../../../api/reactQueryMutations';

const ImportantToggle: React.FC = () => {
  const currentReminder = useCurrentReminderContext();
  const mutation = useQueryUpdate();
  const { important, ...restOFCurrentReminder } = currentReminder;
  return (
    <OptionWrapper
      title={important ? 'Unmark as important' : 'Mark as important'}
      onClick={() =>
        mutation?.mutate({ ...restOFCurrentReminder, important: !important, req: { important: !important } })
      }
      disabled={restOFCurrentReminder.done}
    >
      {important ? <ErrorRoundedIcon /> : <ImportantStyled />}
    </OptionWrapper>
  );
};

export { ImportantToggle };
