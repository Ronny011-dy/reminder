import { DBReminder } from '../routes/ReminderWrapper/ReminderWrapper.types';

interface MutationVariables {
  id: string;
  title?: string;
  parentID?: string;
  createdDate?: string;
  req?: Partial<DBReminder>;
}

export type { MutationVariables };
