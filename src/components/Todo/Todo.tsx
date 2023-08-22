import { useMemo, useState } from 'react';
import { useTheme } from '@mui/material';
import type { TodoProps } from './Todo.types';
import {
  Root,
  StyledListItem,
  StyledDiv,
  ChildReminder,
  Padding,
  StyledListItemText,
  StyledListItemButton,
  CheckboxStyled,
  StyledTagsWrapper
} from './Todo.styles';
import { DoneProvider } from './components/DoneProvider/DoneProvider';
import { ListItemIcon } from '@mui/material';
import { useQueryUpdate } from '../../api/reactQueryMutations';
import { useReminderIdContext } from '../../routes/ReminderWrapper/hooks/useReminderIdContext';
import { ReminderList } from '../../routes/ReminderWrapper/components/ReminderList/ReminderList';
import { RightMenu } from './components/RightMenu/RightMenu';
import { ReminderOptions } from './components/ReminderOptions/ReminderOptions';
import { Tags } from './components/Tags/Tags';

const Todo: React.FC<TodoProps> = ({
  done,
  description,
  parentID,
  reminderIndex,
  onClick,
  selectedIndex,
  childrenReminders,
  lastElementRef,
  tags,
  ...restOfReminderProps
}) => {
  const theme = useTheme();
  const [subReminders, setSubReminders] = useState<string[]>([]);
  const mutation = useQueryUpdate();
  const id = useReminderIdContext();

  const doneHandler = () => {
    subReminders?.map((sub) => mutation?.mutate({ id: sub, req: { done: !done } }));
    mutation?.mutate({ id, req: { done: !done } });
  };

  const isSelected = useMemo(() => selectedIndex === reminderIndex, [selectedIndex, reminderIndex]);

  return (
    <Root ref={lastElementRef}>
      <DoneProvider done={done}>
        <StyledListItem
          theme={theme}
          disablePadding
          disableGutters
          secondaryAction={
            <ReminderOptions
              {...restOfReminderProps}
              subReminders={subReminders}
              setSubReminders={setSubReminders}
              isChild={parentID !== null}
              isSelected={isSelected}
            />
          }
          $isChild={parentID !== null}
        >
          <StyledListItemButton
            theme={theme}
            selected={isSelected}
            onClick={(event) => onClick(event, reminderIndex)}
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
                <StyledListItemText
                  $done={done}
                  selected={isSelected}
                >
                  {restOfReminderProps.title}
                </StyledListItemText>
              </StyledDiv>
              <StyledDiv
                orientation="column"
                paddingLeft
              >
                <StyledListItemText secondary>
                  {description.length > 0 ? `${description}` : 'Enter description'}
                </StyledListItemText>
                <StyledTagsWrapper isSelected={isSelected}>
                  <Tags
                    tags={tags}
                    isSelected={isSelected}
                  />
                </StyledTagsWrapper>
                {!parentID && childrenReminders && childrenReminders?.length > 0 && <Padding />}
                {!parentID && childrenReminders && childrenReminders?.length > 0 && (
                  <ChildReminder>
                    <ReminderList
                      data={childrenReminders}
                      isChild={true}
                      parentID={id}
                    />
                  </ChildReminder>
                )}
              </StyledDiv>
              <RightMenu />
            </StyledDiv>
          </StyledListItemButton>
        </StyledListItem>
      </DoneProvider>
    </Root>
  );
};

export { Todo };
