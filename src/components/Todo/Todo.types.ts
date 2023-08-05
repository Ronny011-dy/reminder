import { DBReminder } from '../../routes/ReminderWrapper/ReminderWrapper.types';

type Reminder = {
  done: boolean;
  title: string;
  description: string;
  tags: Array<string>;
  createdDate?: number;
  date?: number;
  important: boolean;
  parentID?: string;
};

type ListItemButtonProps = {
  i: number;
  onClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => void;
  selectedIndex: number;
};

type ParentReminder = { childrenReminders?: DBReminder[] };

type TodoProps = Reminder & ListItemButtonProps & ParentReminder;

export type { Reminder, TodoProps };
