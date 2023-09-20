import { DbReminder } from '../routes/ReminderWrapper/ReminderWrapper.types';

export type MutationVariables = {
  req?: Partial<DbReminder>;
} & DbReminder;

export interface ContextType {
  previousReminders: DbReminder[];
}
