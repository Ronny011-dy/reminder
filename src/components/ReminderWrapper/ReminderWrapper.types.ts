import type { Reminder } from '../Todo/Todo.types';

type DBReminder = Pick<
  Reminder,
  'title' | 'description' | 'createdDate' | 'important'
> & {
  done: number;
  id: string;
  tags: string;
  // ?DB contains parentId instead of parentID, can be changed
  parentId: string;
  date: number | null;
};

export type { DBReminder };
