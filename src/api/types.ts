import { DBReminder } from '../components/ReminderWrapper/ReminderWrapper.types';

type MutationVariables = {
  id: string;
  title?: string;
  parentId?: string;
  req?: Partial<DBReminder>;
};

export type { MutationVariables };
