import { useState } from 'react';
import React from 'react';

import Input from '@mui/material/Input';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from '@mui/material/IconButton';

import { Root } from './text-input.styles';

type TextInputProps = {
  title: string;
  completed?: boolean;
  secondary?: boolean;
  placeholder: string;
  // tag adder field is the only element with isTag=True
  isTag?: boolean;
  accept?: () => void;
  done?: boolean;
  autoFocus?: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  title,
  secondary,
  isTag,
  placeholder,
  accept,
  done,
  autoFocus,
}) => {
  const [textInput, setTextInput] = useState(title);

  const textInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  return (
    <Root textInput={textInput} secondary={secondary} isTag={isTag} done={done}>
      <Input
        className={`input${secondary ? ' secondary' : ''}${
          done ? ' done' : ''
        }`}
        type="text"
        onChange={textInputChangeHandler}
        placeholder={placeholder}
        value={textInput}
        disableUnderline
        disabled={done}
        autoFocus={autoFocus}
        endAdornment={
          isTag ? (
            <IconButton className="add-tag" onClick={accept} disableRipple>
              <AddRoundedIcon className="secondary" />
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
