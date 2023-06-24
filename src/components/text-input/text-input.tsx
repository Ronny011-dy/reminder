import { useState } from 'react';
import React from 'react';

import Input from '@mui/material/Input';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import IconButton from '@mui/material/IconButton';

type InputProps = {
  title: string;
  completed?: boolean;
  secondary?: boolean;
  isTag?: boolean;
  placeholder: string;
  accept?: () => void;
};

const TextInput: React.FunctionComponent<InputProps> = ({
  title,
  completed,
  secondary,
  isTag,
  placeholder,
  accept,
}) => {
  const [textInput, setTextInput] = useState(title);

  const textInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  return (
    <Input
      className={`input ${secondary ? 'secondary text' : ''}`}
      type="text"
      onChange={textInputChangeHandler}
      placeholder={placeholder}
      // TODO: dynamically push updated value to database as well
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
  );
};

export { TextInput };
