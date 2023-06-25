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
};

const TextInput: React.FC<TextInputProps> = ({
  title,
  secondary,
  isTag,
  placeholder,
  accept,
  done,
}) => {
  const [textInput, setTextInput] = useState(title);

  const textInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  return (
    <Root>
      <Input
        className={`input${done ? ' done' : ''}${
          secondary ? ' secondary text' : ''
        }`}
        type="text"
        onChange={textInputChangeHandler}
        placeholder={placeholder}
        value={textInput}
        style={{ width: `${textInput ? textInput.length : `15`}ch` }}
        disableUnderline={isTag}
        endAdornment={
          !isTag ? (
            <IconButton className="add-tag" onClick={accept}>
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
