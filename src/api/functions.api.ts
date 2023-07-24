import ky from 'ky';

import type { DBReminder } from '../components/ReminderWrapper/ReminderWrapper.types';
import type { MutationVariables } from './types';

const fetchRemindersDB = async (): Promise<DBReminder[]> => {
  return await ky.get('/api/read', {}).json();
};
// supports both reminders and sub reminders
const addNewReminderDB = async (
  req: MutationVariables
): Promise<DBReminder[]> => {
  return await ky
    .post('/api/insert', {
      json: {
        id: req.id,
        done: false,
        title: req.title,
        description: '',
        tags: '[]',
        createdDate: String(Date.now()),
        date: null,
        important: false,
        parentID: req?.parentID || null,
      },
    })
    .json();
};

// updating only one propery per request
const updateReminderDB = async (
  req: MutationVariables
): Promise<DBReminder[]> => {
  //? change from post to put
  return await ky.post(`/api/update/${req.id}`, { json: req.req }).json();
};
const deleteReminderDB = async (
  req: MutationVariables
): Promise<DBReminder[]> => {
  return await ky.post(`/api/drop/${req.id}`, {}).json();
};

export {
  fetchRemindersDB,
  addNewReminderDB,
  updateReminderDB,
  deleteReminderDB,
};
