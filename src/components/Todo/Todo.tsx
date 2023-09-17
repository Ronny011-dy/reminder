import { useEffect, useMemo, useRef } from 'react';
import { useTheme } from '@mui/material';

import type { TodoProps } from './Todo.types';
import {
  Root,
  StyledListItem,
  StyledDiv,
  StyledListItemText,
  StyledListItemButton,
  CheckboxStyled,
  StyledTagsWrapper,
  StyledFocusableDiv
} from './Todo.styles';
import { ListItemIcon } from '@mui/material';
import { useQueryUpdate } from '../../api/reactQueryMutations';
import { useCurrentReminderContext } from '../../routes/ReminderWrapper/hooks/useCurrentReminderContext';
import { ReminderOptions } from './components/ReminderOptions/ReminderOptions';
import { Tags } from './components/Tags/Tags';
import { InputText } from './components/InputText/InputText';
import { Draggable } from '@hello-pangea/dnd';
import { useQueryClient } from 'react-query';
import { flat } from '../../routes/ReminderWrapper/utils/ReminderWrapper.util';

export const Todo: React.FC<TodoProps> = ({
  done,
  reminderIndex,
  handleReminderClick,
  selectedIndex,
  lastElementRef,
  draggableId,
  setDraggableId,
  isChild,
  ...reminderOptionParams
}) => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const mutation = useQueryUpdate();
  const currentDbReminder = useCurrentReminderContext();
  const focusableDiv = useRef<HTMLDivElement>(null);
  const { id } = currentDbReminder;

  const doneHandler = () => {
    if (!isChild) {
      const subreminders = flat(queryClient.getQueryData(['subreminders', id]));
      subreminders.length > 0 &&
        subreminders.forEach((subreminder) => {
          const { done: subDone, ...restOfSubReminder } = subreminder;
          mutation?.mutate({ ...restOfSubReminder, done: !subDone, req: { done: !subDone } });
        });
    }
    const { done: _, ...restOfCurrentDbReminder } = currentDbReminder;
    mutation?.mutate({ ...restOfCurrentDbReminder, done: !done, req: { done: !done } });
  };

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleReminderClick(e, reminderIndex);
    !isChild && reminderOptionParams.setParentID(id);
  };

  const isSelected = useMemo(() => selectedIndex === reminderIndex, [selectedIndex, reminderIndex]);

  useEffect(() => {
    id === draggableId && focusableDiv.current?.scrollIntoView({ behavior: 'instant' });
    setDraggableId('');
  }, [draggableId]);

  return (
    <Root ref={lastElementRef}>
      <StyledFocusableDiv ref={focusableDiv}>
        <Draggable
          key={id}
          draggableId={id}
          index={reminderIndex}
        >
          {(provided) => (
            <StyledListItem
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              theme={theme}
              disablePadding
              disableGutters
              secondaryAction={
                <ReminderOptions
                  {...reminderOptionParams}
                  isSelected={isSelected}
                  isChild={isChild}
                />
              }
              $isChild={isChild}
            >
              <StyledListItemButton
                theme={theme}
                selected={isSelected}
                onClick={handleOnClick}
                disableGutters
              >
                <StyledDiv
                  orientation="column"
                  align
                >
                  <StyledDiv
                    orientation="row"
                    align
                  >
                    <ListItemIcon>
                      <CheckboxStyled
                        checked={done}
                        onClick={doneHandler}
                        theme={theme}
                      />
                    </ListItemIcon>
                    <InputText isTitle />
                  </StyledDiv>
                  <StyledDiv orientation="column">
                    <StyledListItemText isSelected={isSelected}>
                      <InputText />
                    </StyledListItemText>
                    <StyledTagsWrapper isSelected={isSelected}>
                      <Tags isSelected={isSelected} />
                    </StyledTagsWrapper>
                  </StyledDiv>
                </StyledDiv>
              </StyledListItemButton>
            </StyledListItem>
          )}
        </Draggable>
      </StyledFocusableDiv>
    </Root>
  );
};
