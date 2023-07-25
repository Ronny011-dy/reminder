import { IdProvider } from '../IdProvider/IdProvider';
import { Todo } from '../../../Todo/Todo';
import { DBReminder } from '../../ReminderWrapper.types';
import { List } from '@mui/material';

import { Root } from './ReminderList.styles';

type ReminderListProps = {
  data?: DBReminder[];
};

const ReminderList: React.FC<ReminderListProps> = ({ data }) => {
  return (
    <Root>
      {data &&
        data.map((reminder) => {
          return (
            <IdProvider id={reminder.id} key={reminder.id}>
              <Todo
                done={Boolean(reminder.done)}
                title={reminder.title}
                description={reminder.description}
                tags={JSON.parse(reminder.tags)}
                createdDate={reminder.createdDate}
                date={reminder.date === null ? undefined : reminder.date}
                important={reminder.important}
                parentID={reminder.parentID}
              />
            </IdProvider>
          );
        })}
    </Root>
  );
};

export { ReminderList };
