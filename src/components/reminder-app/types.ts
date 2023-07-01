import type { Reminder } from '../to-do/types';

export type DBReminder = Pick<
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
