import { useState } from 'react';
import React from 'react';

import Input from '@mui/material/Input';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import IconButton from '@mui/material/IconButton';

import { Root } from './text-input.styles';

type TextInputProps = {
  title: string;
  completed?: boolean;
  secondary?: boolean;
  isTag?: boolean;
  placeholder: string;
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
    <Root textInput={textInput} secondary={secondary}>
      <Input
        className={`input${done ? ' done' : ''}${
          secondary ? ' secondary' : ''
        }`}
        type="text"
        onChange={textInputChangeHandler}
        placeholder={placeholder}
        value={textInput}
        disableUnderline
        disabled={done}
        autoFocus={autoFocus}
        endAdornment={
          !isTag ? (
            <IconButton className="add-tag" onClick={accept} disableRipple>
              <ArrowCircleRightIcon className="secondary" />
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
