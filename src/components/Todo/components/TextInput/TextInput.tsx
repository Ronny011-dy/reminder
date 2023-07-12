import { useState } from 'react';

import Input from '@mui/material/Input';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from '@mui/material/IconButton';

import { useReminderIdContext } from '../../../ReminderWrapper/hooks/useReminderIdContext';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';
import { useReminderDoneContext } from '../../hooks/useReminderDoneContext';
import { updateReminderDB } from '../../../../api/functions.api';

import { Root } from './TextInput.styles';

type TextInputProps = {
  title: string;
  completed?: boolean;
  secondary?: boolean;
  placeholder: string;
  // tag adder field is the only element with isTag=True
  isTag?: boolean;
  accept?: () => void;
  autoFocus?: boolean;
  setTagText?: React.Dispatch<React.SetStateAction<string>>;
};

const TextInput: React.FC<TextInputProps> = ({
  title,
  secondary,
  isTag,
  placeholder,
  accept,
  autoFocus,
  setTagText,
}) => {
  const id = useReminderIdContext();
  const done = useReminderDoneContext();
  const mutation = useQueryClientAndMutation(updateReminderDB, 'Update');
  const [textInput, setTextInput] = useState(title);

  const acceptHandler = () => {
    // clear field in UI when clicking 'add tag'
    setTextInput('');
    accept && accept();
  };

  const textInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
    !isTag &&
      !secondary &&
      mutation.mutate({ id, req: { title: e.target.value } });
    !isTag &&
      secondary &&
      mutation.mutate({ id, req: { description: e.target.value } });
    // tags have their own logic in the parent component
    isTag && setTagText && setTagText(e.target.value);
  };

  return (
    <Root textInput={textInput} secondary={secondary} isTag={isTag} done={done}>
      <Input
        type="text"
        onChange={textInputChangeHandler}
        placeholder={placeholder}
        value={textInput}
        disabled={done}
        autoFocus={autoFocus}
        endAdornment={
          isTag ? (
            <IconButton onClick={acceptHandler}>
              <AddRoundedIcon />
            </IconButton>
          ) : (
            ''
          )
        }
      />
    </Root>
  );
};

export { TextInput };
