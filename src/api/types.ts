import { DBReminder } from '../components/reminder-app/types';

type MutationVariables = {
  id?: string;
  req?: Partial<DBReminder>;
};

export type { MutationVariables };
