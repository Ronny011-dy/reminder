import ky from 'ky';
import { v4 as uuidv4 } from 'uuid';

import type { DBReminder } from '../components/reminder-app/types';
import type { MutationVariables } from '../components/hooks/useQueryClientAndMutation';

const fetchRemindersDB = async (): Promise<DBReminder[]> => {
  return await ky.get('/api/read', {}).json();
};

const addNewReminderDB = async (): Promise<DBReminder[]> => {
  return await ky
    .post('/api/insert', {
      json: {
        id: uuidv4(),
        done: false,
        title: '',
        description: '',
        tags: '[]',
        createdDate: Date.now(),
        date: null,
        important: false,
        parentId: null,
      },
    })
    .json();
};

// updating only one propery per request
const updateReminderDB = async (
  obj: MutationVariables
): Promise<DBReminder[]> => {
  //? change from post to put
  return await ky.post(`/api/update/${obj.id}`, { json: obj.req }).json();
};
const deleteReminderDB = async (
  obj: MutationVariables
): Promise<DBReminder[]> => {
  return await ky.post(`/api/drop/${obj.id}`, {}).json();
};

export {
  fetchRemindersDB,
  addNewReminderDB,
  updateReminderDB,
  deleteReminderDB,
};
