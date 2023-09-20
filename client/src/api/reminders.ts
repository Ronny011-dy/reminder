import ky from 'ky';

import type { DbReminder } from '../routes/ReminderWrapper/ReminderWrapper.types';
import type { MutationVariables } from './types';
import { paginationPageLength } from '../common/values';

export interface ReminderToMove {
  sourceReminder: DbReminder;
  destinationReminder: DbReminder;
  upperReminder: DbReminder;
  bottomReminder: DbReminder;
}

const debounce = <F extends (req: MutationVariables) => Promise<DbReminder>>(func: F, delay: number): F => {
  let timeout: NodeJS.Timeout | null = null;

  const debouncedFunc = ((req: MutationVariables) => {
    timeout && clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(req);
    }, delay);
  }) as F;

  return debouncedFunc;
};

export const fetchAllReminders = async (page: number): Promise<DbReminder[]> => {
  const remindersToShow = paginationPageLength;
  const response = (await ky.get('/api/read').json()) as DbReminder[];
  return response.slice((page - 1) * remindersToShow, page * remindersToShow);
};

export const fetchParentReminders = async (page: number): Promise<DbReminder[]> => {
  const remindersToShow = paginationPageLength;
  const response = (await ky.get('/api/read/parent-reminders/').json()) as DbReminder[];
  return response.slice((page - 1) * remindersToShow, page * remindersToShow);
};

export const fetchSubreminders = async (page: number, parentID: string): Promise<DbReminder[]> => {
  // prevent fetching from /api/read/subreminders
  if (!parentID || parentID === '') return [];
  const subremindersToShow = paginationPageLength;
  // on clickaway, the parentID is set to '' and the API call will respond with 404
  const response = (await ky.get(`/api/read/subreminders/${parentID}`).json()) as DbReminder[];
  return response.slice((page - 1) * subremindersToShow, page * subremindersToShow);
};

// supports both reminders and sub reminders
export const addNewReminder = async (req: DbReminder): Promise<DbReminder[]> => {
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
export const updateReminder = async (req: MutationVariables): Promise<DbReminder> => {
  //? change from post to put
  return await ky.post(`/api/update/${req.id}`, { json: req.req }).json();
};

export const updateReminderDebounce = debounce(updateReminder, 500);

export const deleteReminder = async (req: MutationVariables): Promise<DbReminder[]> => {
  return await ky.post(`/api/drop/${req.id}`, {}).json();
};

export const moveReminder = async (reminderDragDropObj: ReminderToMove) => {
  const { sourceReminder, upperReminder, bottomReminder } = reminderDragDropObj;
  const upperOrderId = upperReminder?.orderID ? Number(upperReminder.orderID) : undefined;
  const bottomOrderId = bottomReminder?.orderID ? Number(bottomReminder.orderID) : undefined;
  let destinationOrderId = 0;
  // if put in topmost slot - there is no upperOrderId
  if (!upperOrderId) destinationOrderId = Date.now() - 1;
  // if put in bottom-most slot - there is no bottomOrderId
  //  0.999 will give us ~ 25842 drags to bottom in a row
  else if (!bottomOrderId && upperOrderId) destinationOrderId = Math.floor(upperOrderId * 0.999);
  // all other cases
  else if (upperOrderId && bottomOrderId) destinationOrderId = Math.floor((upperOrderId + bottomOrderId) / 2);

  updateReminderDebounce({ ...sourceReminder, req: { orderID: String(destinationOrderId) } });
};
