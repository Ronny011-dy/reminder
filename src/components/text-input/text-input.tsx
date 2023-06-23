import { useState } from 'react';
import * as React from 'react';

import Input from '@mui/material/Input';

type InputProps = {
  title: string;
  completed?: boolean;
  secondary?: boolean;
};

const TextInput: React.FunctionComponent<InputProps> = ({
  title,
  completed,
  secondary,
}) => {
  const [textInput, setTextInput] = useState(title);

  const textInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  return (
    <Input
      className={`input ${secondary ? 'secondary' : ''}`}
      type="text"
      onChange={textInputChangeHandler}
      placeholder={'Enter reminder'}
      // TODO: dynamically push updated value to database as well
      value={textInput}
      style={{ width: `${textInput ? textInput.length : `15`}ch` }}
      disableUnderline
    />
  );
};

export default TextInput;
