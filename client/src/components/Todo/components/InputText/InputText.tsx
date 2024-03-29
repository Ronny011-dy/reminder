import { useRef, useState } from 'react';
import { useQueryDelete, useQueryUpdate } from '../../../../api/reactQueryMutations';
import { Root, StyledTextInput } from './InputText.styles';
import { useCurrentReminderContext } from '../../../../routes/ReminderWrapper/hooks/useCurrentReminderContext';

type InputTextProps = { isTitle?: boolean };

export const InputText: React.FC<InputTextProps> = ({ isTitle }) => {
  const currentReminder = useCurrentReminderContext();
  const { title, description, ...restOfCurrentReminder } = currentReminder;
  const [textValue, setTextValue] = useState(isTitle ? title : description);
  const formRef = useRef<HTMLFormElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const updateMutation = useQueryUpdate();
  const deleteMutation = useQueryDelete();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const textSubmit = () => {
    isTitle
      ? textValue !== title &&
        updateMutation?.mutate({ title: textValue, description, ...restOfCurrentReminder, req: { title: textValue } })
      : textValue !== description &&
        updateMutation?.mutate({
          title,
          description: textValue,
          ...restOfCurrentReminder,
          req: { description: textValue }
        });
  };

  const handleTextInputBlur = () => {
    if (isTitle && textValue === '') {
      deleteMutation.mutate({ title, description, ...restOfCurrentReminder });
      return;
    }
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
    <Root $done={restOfCurrentReminder.done}>
      <form ref={formRef}>
        <StyledTextInput
          name="reminder-title"
          ref={textInputRef}
          required
          minLength={0}
          maxLength={100}
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
