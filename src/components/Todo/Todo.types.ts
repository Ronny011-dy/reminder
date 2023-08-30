import { DbReminder } from '../../routes/ReminderWrapper/ReminderWrapper.types';

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
  reminderIndex: number;
  selectedIndex: number;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void;
  lastElementRef?: (element: any) => void;
};

type ParentReminder = { childrenReminders?: DbReminder[] };

type TodoProps = Reminder & ListItemButtonProps & ParentReminder;

export type { Reminder, TodoProps };
