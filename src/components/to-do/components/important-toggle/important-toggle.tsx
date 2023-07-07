import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

import { OptionWrapper } from '../option-wrapper/option-wrapper';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';
import { useReminderIdContext } from '../../../../hooks/useReminderIdContext';
import { updateReminderDB } from '../../../../api/functions.api';

import { Root } from './important-toggle.styles';

type ImportantToggleProps = { important: boolean; done?: boolean };

const ImportantToggle: React.FC<ImportantToggleProps> = ({
  important,
  done,
}) => {
  const id = useReminderIdContext();

  const mutation = useQueryClientAndMutation(updateReminderDB, 'Update');
  return (
    <Root>
      <OptionWrapper
        title={important ? 'Unmark as important' : 'Mark as important'}
        onClick={() => mutation.mutate({ id, req: { important: !important } })}
      >
        {important ? (
          <ErrorRoundedIcon />
        ) : (
          <ErrorOutlineRoundedIcon className="secondary" />
        )}
      </OptionWrapper>
    </Root>
  );
};

export { ImportantToggle };
