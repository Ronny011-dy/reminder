import type { Reminder } from '../Todo/Todo.types';

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
