import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import type { TodoProps } from './Todo.types';
import {
  Root,
  ChildReminder,
  AlignedStack,
  Padding,
  ListItemTextStyled,
  ListItemButtonStyled,
  CheckboxStyled,
} from './Todo.styles';
import { DoneProvider } from './components/DoneProvider/DoneProvider';
import { ListItem, ListItemIcon, Stack } from '@mui/material';
import { useQueryClientAndMutation } from '../../hooks/useQueryClientAndMutation';
import { updateReminderDB } from '../../api/functions.api';
import { useReminderIdContext } from '../../routes/ReminderWrapper/hooks/useReminderIdContext';
import { ReminderList } from '../../routes/ReminderWrapper/components/ReminderList/ReminderList';
import { RightMenu } from './components/RightMenu/RightMenu';
import { ReminderOptions } from './components/ReminderOptions/ReminderOptions';

const Todo: React.FC<TodoProps> = ({
  done,
  title,
  description,
  tags,
  date,
  important,
  parentID,
  i,
  onClick,
  selectedIndex,
  childrenReminders,
}) => {
  const [isTextHidden, setIsTextHidden] = useState(false);
  const shouldDisplay = selectedIndex !== i ? true : !isTextHidden;
  useEffect(() => {
    if (selectedIndex !== i) {
      setIsTextHidden(false);
    }
  }, [selectedIndex, i]);
  const theme = useTheme();
  const [subReminders, setSubReminders] = useState<string[]>([]);
  const mutation = useQueryClientAndMutation(updateReminderDB, 'Update');
  const id = useReminderIdContext();

  const doneHandler = () => {
    subReminders &&
      subReminders.map((sub) =>
        mutation.mutate({ id: sub, req: { done: !done } })
      );
    mutation.mutate({ id, req: { done: !done } });
  };

  return (
    <Root isChild={parentID !== null} theme={theme}>
      <DoneProvider done={done}>
        <ListItem
          disablePadding
          disableGutters
          secondaryAction={
            <ReminderOptions
              important={important}
              subState={subReminders}
              subSetter={setSubReminders}
              isChild={parentID !== null}
              isSelected={selectedIndex === i}
              reminderText={title}
              date={date}
              tags={tags}
              isHidden={isTextHidden}
              hideHandler={setIsTextHidden}
            />
          }
        >
          <ListItemButtonStyled
            theme={theme}
            disableGutters
            selected={selectedIndex === i}
            onClick={(event) => onClick(event, i)}
            disableRipple
            disableTouchRipple
          >
            <Stack direction="column">
              <AlignedStack direction="row">
                <ListItemIcon>
                  <CheckboxStyled
                    checked={done}
                    onClick={doneHandler}
                    theme={theme}
                  />
                </ListItemIcon>
                <ListItemTextStyled
                  $done={done}
                  $display={shouldDisplay}
                  $selected={selectedIndex === i}
                >
                  {title}
                </ListItemTextStyled>
              </AlignedStack>
              {/* <ListItemTextStyled secondary={description} /> */}
            </Stack>
            {!parentID &&
              childrenReminders &&
              childrenReminders?.length > 0 && <Padding />}
            {!parentID &&
              childrenReminders &&
              childrenReminders?.length > 0 && (
                <ChildReminder>
                  <ReminderList
                    data={childrenReminders}
                    isChild={true}
                    parentID={id}
                  />
                </ChildReminder>
              )}
            <RightMenu />
          </ListItemButtonStyled>
        </ListItem>
      </DoneProvider>
    </Root>
  );
};

export { Todo };
