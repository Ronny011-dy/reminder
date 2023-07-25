import type { Reminder } from '../Todo/Todo.types';

type DBReminder = Pick<
  Reminder,
  'done' | 'title' | 'description' | 'important' | 'parentID'
> & {
  createdDate?: string;
  date?: string;
  id: string;
  tags: string;
};

export type { DBReminder };
