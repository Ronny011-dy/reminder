import ky from 'ky';

import type { DBReminder } from '../routes/ReminderWrapper/ReminderWrapper.types';
import type { MutationVariables } from './types';
import { paginationPageLength } from '../common/values';

const fetchReminders = async (page: number): Promise<DBReminder[]> => {
  const remindersToShow = paginationPageLength;
  const response = (await ky.get('/api/read').json()) as DBReminder[];
  return response.slice((page - 1) * remindersToShow, page * remindersToShow);
};

// supports both reminders and sub reminders
const addNewReminder = async (req: DBReminder): Promise<DBReminder[]> => {
  const { parentID, ...otherJsonProps } = req;
  return await ky
    .post('/api/insert', {
      json: {
        ...otherJsonProps,
        parentID: req?.parentID || null
      }
    })
    .json();
};

// updating only one propery per request
const updateReminder = async (req: MutationVariables): Promise<DBReminder> => {
  //? change from post to put
  return await ky.post(`/api/update/${req.id}`, { json: req.req }).json();
};

const deleteReminder = async (req: MutationVariables): Promise<DBReminder[]> => {
  return await ky.post(`/api/drop/${req.id}`, {}).json();
};

export { fetchReminders, addNewReminder, updateReminder, deleteReminder };
