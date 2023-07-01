import ky from 'ky';
import { v4 as uuidv4 } from 'uuid';

import type { DBReminder } from '../components/reminder-app/types';

//API
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

export { fetchRemindersDB, addNewReminderDB };
