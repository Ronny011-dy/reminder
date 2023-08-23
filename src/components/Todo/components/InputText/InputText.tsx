import { useRef, useState } from 'react';
import { useQueryUpdate } from '../../../../api/reactQueryMutations';
import { DBReminder } from '../../../../routes/ReminderWrapper/ReminderWrapper.types';
import { Root, StyledTextInput } from './InputText.styles';

type InputTextProps = { textFromDb: string; currentReminder: DBReminder; isSelected: boolean; isTitle?: boolean };

export const InputText: React.FC<InputTextProps> = ({ textFromDb, currentReminder, isSelected, isTitle }) => {
  const [textValue, setTextValue] = useState(textFromDb);
  const formRef = useRef<HTMLFormElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const mutation = useQueryUpdate();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const textSubmit = () => {
    if (textValue !== textFromDb) {
      isTitle
        ? mutation?.mutate({ ...currentReminder, req: { title: textValue } })
        : mutation?.mutate({ ...currentReminder, req: { description: textValue } });
    }
  };

  const handleTextInputBlur = () => {
    formRef.current?.reportValidity() && textSubmit();
  };

  const handleTextInputKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTextInputBlur();
      textInputRef.current?.blur();
    }
  };
  return (
    <Root
      $done={currentReminder.done}
      isSelected={isSelected}
    >
      <form ref={formRef}>
        <StyledTextInput
          ref={textInputRef}
          required
          maxLength={100}
          minLength={1}
          type="text"
          value={textValue}
          onChange={handleTextChange}
          onBlur={handleTextInputBlur}
          onKeyDown={handleTextInputKeyDown}
          placeholder={`Enter ${isTitle ? 'title' : 'Description'}`}
        />
      </form>
    </Root>
  );
};
