import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

import { OptionWrapper } from '../OptionWrapper/OptionWrapper';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';
import { useReminderIdContext } from '../../../ReminderWrapper/hooks/useReminderIdContext';
import { updateReminderDB } from '../../../../api/functions.api';

import { ImportantStyled } from './ImportantToggle.styles';

type ImportantToggleProps = { important: boolean; isChild: boolean };

const ImportantToggle: React.FC<ImportantToggleProps> = ({
  important,
  isChild,
}) => {
  const id = useReminderIdContext();

  const mutation = useQueryClientAndMutation(updateReminderDB, 'Update');
  if (isChild) return null;
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
