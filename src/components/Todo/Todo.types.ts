import { DbReminder } from '../../routes/ReminderWrapper/ReminderWrapper.types';

export type Reminder = {
  done: boolean;
  title: string;
  description: string;
  tags: Array<string>;
  createdDate?: number;
  date?: number;
  important: boolean;
  parentID?: string;
};

interface ListItemButtonProps {
  reminderIndex: number;
  selectedIndex: number;
  handleReminderClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void;
  lastElementRef?: (element: HTMLDivElement) => void;
}

interface ParentReminder {
  childrenReminders?: DbReminder[];
}

interface DraggableProps {
  draggableId: string;
  setDraggableId: React.Dispatch<React.SetStateAction<string>>;
}

export type TodoProps = Reminder & ListItemButtonProps & ParentReminder & DraggableProps;
