import type { Reminder } from '../to-do/types';

type DBReminder = Pick<
  Reminder,
  'title' | 'description' | 'createdDate' | 'date' | 'important'
> & {
  done: number;
  id: string;
  tags: string;
  // DB contains parentId, which should be changed
  parentId: string;
};

export type { DBReminder };
