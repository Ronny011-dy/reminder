import type { Reminder } from '../to-do/types';

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
