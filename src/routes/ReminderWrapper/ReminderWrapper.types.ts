import type { Reminder } from '../../components/Todo/Todo.types';

export type DBReminder = Pick<Reminder, 'done' | 'title' | 'description' | 'important'> & {
  createdDate?: string;
  date?: string;
  id: string;
  tags: string;
  parentID: null | string;
};
