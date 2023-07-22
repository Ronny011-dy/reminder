import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';
import { useReminderIdContext } from '../../../ReminderWrapper/hooks/useReminderIdContext';
import { updateReminderDB } from '../../../../api/functions.api';

import { ImportantStyled } from './ImportantToggle.styles';

type ImportantToggleProps = { important: boolean };

const ImportantToggle: React.FC<ImportantToggleProps> = ({ important }) => {
  const id = useReminderIdContext();

  const mutation = useQueryClientAndMutation(updateReminderDB, 'Update');
  return (
    <OptionWrapper
      title={important ? 'Unmark as important' : 'Mark as important'}
      onClick={() => mutation.mutate({ id, req: { important: !important } })}
    >
      {important ? <ErrorRoundedIcon /> : <ImportantStyled />}
    </OptionWrapper>
  );
};

export { ImportantToggle };
