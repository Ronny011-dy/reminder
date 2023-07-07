import { DBReminder } from '../components/reminder-wrapper/types';

type MutationVariables = {
  id: string;
  parentId?: string;
  req?: Partial<DBReminder>;
};

export type { MutationVariables };
