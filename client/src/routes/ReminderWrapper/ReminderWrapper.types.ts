import type { Reminder } from '../../components/Todo/Todo.types';

export type DbReminder = Pick<Reminder, 'done' | 'title' | 'description' | 'important'> & {
  createdDate?: string;
  orderID?: string;
  date: null | string;
  id: string;
  tags: string;
  parentID: null | string;
};
