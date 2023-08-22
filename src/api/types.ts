import { DBReminder } from '../routes/ReminderWrapper/ReminderWrapper.types';

type MutationVariables = {
  req: Partial<DBReminder>;
} & DBReminder;

export type { MutationVariables };
