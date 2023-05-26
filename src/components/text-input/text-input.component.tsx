import { useState } from 'react';

import Input from '@mui/material/Input';

type InputProps = {
  title: string;
  group?: boolean;
  completed?: boolean;
};

const TextInput: React.FunctionComponent<InputProps> = (props) => {
  const [textInput, setTextInput] = useState(props.title);

  const textInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  return (
    <Input
      type="text"
      onChange={textInputChangeHandler}
      className={`input ${props.group} ${props.completed}`}
      placeholder={props.group ? `Enter Group name` : `Enter reminder`}
      value={textInput}
      style={{ width: `${textInput ? textInput.length : `15`}ch` }}
      disableUnderline
    />
  );
};

export default TextInput;
