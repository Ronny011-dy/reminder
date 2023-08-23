import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { useCurrentReminderContext } from '../../../../routes/ReminderWrapper/hooks/useCurrentReminderContext';

import { ImportantStyled } from './ImportantToggle.styles';
import { useReminderDoneContext } from '../../hooks/useReminderDoneContext';
import { useQueryUpdate } from '../../../../api/reactQueryMutations';

type ImportantToggleProps = { important: boolean };

const ImportantToggle: React.FC<ImportantToggleProps> = ({ important }) => {
  const id = useCurrentReminderContext();
  const done = useReminderDoneContext();

  const mutation = useQueryUpdate();
  return (
    <OptionWrapper
      title={important ? 'Unmark as important' : 'Mark as important'}
      onClick={() => mutation?.mutate({ id, req: { important: !important } })}
      disabled={done}
    >
      {important ? <ErrorRoundedIcon /> : <ImportantStyled />}
    </OptionWrapper>
  );
};

export { ImportantToggle };
