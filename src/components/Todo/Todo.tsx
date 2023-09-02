import { useEffect, useMemo, useRef, useState } from 'react';
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
import { useRemindersDataContext } from '../../routes/ReminderWrapper/hooks/useRemindersDataContext';

export const Todo: React.FC<TodoProps> = ({
  done,
  description,
  parentID,
  reminderIndex,
  handleReminderClick,
  selectedIndex,
  childrenReminders,
  lastElementRef,
  tags,
  title,
  draggableId,
  setDraggableId,
  isChild,
  ...restOfReminderProps
}) => {
  const theme = useTheme();
  const [subReminderIds, setSubReminderIds] = useState<string[]>([]);
  const mutation = useQueryUpdate();
  const currentReminder = useCurrentReminderContext();
  const { setChildReminders, setParentID, parentID: contextParentID } = useRemindersDataContext();
  const focusableDiv = useRef<HTMLDivElement>(null);

  const doneHandler = () => {
    // subReminderIds?.map((sub) => mutation?.mutate({ id: sub, req: { done: !done } }));
    const { done: _, ...restOfCurrentReminder } = currentReminder;
    mutation?.mutate({ ...restOfCurrentReminder, done: !done, req: { done: !done } });
  };

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleReminderClick(e, reminderIndex);
    if (!isChild) {
      childrenReminders && childrenReminders?.length > 0 ? setChildReminders(childrenReminders) : setChildReminders([]);
      setParentID(currentReminder.id);
    }
  };

  const isSelected = useMemo(() => selectedIndex === reminderIndex, [selectedIndex, reminderIndex]);

  useEffect(() => {
    currentReminder.id === draggableId && focusableDiv.current?.scrollIntoView({ behavior: 'instant' });
    setDraggableId('');
  }, [draggableId]);

  return (
    <Root ref={lastElementRef}>
      <StyledFocusableDiv ref={focusableDiv}>
        <Draggable
          draggableId={currentReminder.id}
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
                  {...restOfReminderProps}
                  title={title}
                  subReminderIds={subReminderIds}
                  setSubReminderIds={setSubReminderIds}
                  isSelected={isSelected}
                  isChild={parentID !== null}
                />
              }
              $isChild={parentID !== null}
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
                    <InputText
                      currentReminder={currentReminder}
                      isSelected={isSelected}
                      isTitle
                    />
                  </StyledDiv>
                  <StyledDiv orientation="column">
                    <StyledListItemText isSelected={isSelected}>
                      <InputText
                        currentReminder={currentReminder}
                        isSelected={isSelected}
                      />
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
