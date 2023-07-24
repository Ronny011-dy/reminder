import { DBReminder } from '../components/ReminderWrapper/ReminderWrapper.types';

type MutationVariables = {
  id: string;
  title?: string;
  parentID?: string;
  req?: Partial<DBReminder>;
};

export type { MutationVariables };
