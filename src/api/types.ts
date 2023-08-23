import { DBReminder } from '../routes/ReminderWrapper/ReminderWrapper.types';

export type MutationVariables = {
  req: Partial<DBReminder>;
} & DBReminder;

export interface ContextType {
  previousReminders: DBReminder[];
}
