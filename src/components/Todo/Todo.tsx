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
import { ListItemIcon } from '@mui/material';
import { useQueryUpdate } from '../../api/reactQueryMutations';
import { useCurrentReminderContext } from '../../routes/ReminderWrapper/hooks/useCurrentReminderContext';
import { ReminderList } from '../../routes/ReminderWrapper/components/ReminderList/ReminderList';
import { RightMenu } from './components/RightMenu/RightMenu';
import { ReminderOptions } from './components/ReminderOptions/ReminderOptions';
import { Tags } from './components/Tags/Tags';
import { InputText } from './components/InputText/InputText';

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
  title,
  ...restOfReminderProps
}) => {
  const theme = useTheme();
  const [subReminderIds, setSubReminderIds] = useState<string[]>([]);
  const mutation = useQueryUpdate();
  const currentReminder = useCurrentReminderContext();

  const doneHandler = () => {
    // subReminderIds?.map((sub) => mutation?.mutate({ id: sub, req: { done: !done } }));
    const { done: _, ...restofDBReminder } = currentReminder;
    mutation?.mutate({ ...restofDBReminder, done: !done, req: { done: !done } });
  };

  const isSelected = useMemo(() => selectedIndex === reminderIndex, [selectedIndex, reminderIndex]);

  return (
    <Root ref={lastElementRef}>
      <StyledListItem
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
              <InputText
                textFromDb={title}
                currentReminder={currentReminder}
                isSelected={isSelected}
                isTitle
              />
            </StyledDiv>
            <StyledDiv
              orientation="column"
              paddingLeft
            >
              <StyledListItemText isSelected={isSelected}>
                <InputText
                  textFromDb={description}
                  currentReminder={currentReminder}
                  isSelected={isSelected}
                />
              </StyledListItemText>
              <StyledTagsWrapper isSelected={isSelected}>
                <Tags isSelected={isSelected} />
              </StyledTagsWrapper>
              {/* {!parentID && childrenReminders && childrenReminders?.length > 0 && <Padding />}
                {!parentID && childrenReminders && childrenReminders?.length > 0 && (
                  <ChildReminder>
                    <ReminderList
                      data={childrenReminders}
                      isChild={true}
                      parentID={id}
                    />
                  </ChildReminder>
                )} */}
            </StyledDiv>
            <RightMenu />
          </StyledDiv>
        </StyledListItemButton>
      </StyledListItem>
    </Root>
  );
};

export { Todo };
