import { IdProvider } from '../../components/id-provider/id-provider';
import { Todo } from '../../../to-do/to-do';
import { DBReminder } from '../../types';
import { List } from '@mui/material';
import { Root, ChildReminder } from './reminder-list.styles';

type ReminderListProps = { data?: DBReminder[] };

const ReminderList: React.FC<ReminderListProps> = ({ data }) => {
  let parentId = '';
  return (
    <Root>
      <List>
        {data &&
          data.map((reminder) => {
            if (!reminder.parentId) {
              parentId = reminder.id;
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
                    parentID={reminder.parentId}
                  />
                </IdProvider>
              );
            }
            if (reminder.parentId === parentId)
              return (
                <ChildReminder>
                  <IdProvider id={reminder.id} key={reminder.parentId}>
                    <Todo
                      done={Boolean(reminder.done)}
                      title={reminder.title}
                      description={reminder.description}
                      tags={JSON.parse(reminder.tags)}
                      createdDate={reminder.createdDate}
                      date={reminder.date === null ? undefined : reminder.date}
                      important={reminder.important}
                      parentID={reminder.parentId}
                    />
                  </IdProvider>
                </ChildReminder>
              );
          })}
      </List>
    </Root>
  );
};

export { ReminderList };
