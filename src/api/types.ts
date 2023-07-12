import { DBReminder } from '../components/ReminderWrapper/ReminderWrapper.types';

type MutationVariables = {
  id: string;
  parentId?: string;
  req?: Partial<DBReminder>;
};

export type { MutationVariables };
