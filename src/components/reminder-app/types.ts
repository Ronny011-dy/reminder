import type { Reminder } from '../to-do/types';

type DBReminder = Pick<
  Reminder,
  | 'done'
  | 'title'
  | 'description'
  | 'createdDate'
  | 'date'
  | 'important'
  | 'parentID'
> & {
  id: string;
  tags: string;
};

export type { DBReminder };
