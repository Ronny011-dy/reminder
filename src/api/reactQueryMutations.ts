import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

import type { ContextType, MutationVariables } from './types';
import { addNewReminder, deleteReminder, updateReminder } from './reminders';
import { flat } from '../routes/ReminderWrapper/utils/ReminderWrapper.util';
import { DBReminder } from '../routes/ReminderWrapper/ReminderWrapper.types';
import { paginationPageLength } from '../common/values';

export const useQueryCreate = () => {
  const queryClient = useQueryClient();

  return useMutation<DBReminder[], unknown, DBReminder>({
    mutationFn: (variables: DBReminder) => addNewReminder(variables),

    onMutate: async (newReminder) => {
      await queryClient.cancelQueries({ queryKey: ['reminders'] });
      const previousReminders = flat(queryClient.getQueryData(['reminders']));

      queryClient.setQueryData<InfiniteData<DBReminder[]>>(['reminders'], (oldData) => {
        return saveNewCache(oldData, newReminder);
      });
      return { previousReminders };
    },

    onError: (err, newReminder, context) => {
      // inferring context type in the arguments breaks the overload
      const tempContext = context as ContextType;
      queryClient.setQueryData(['reminders'], tempContext.previousReminders);
      toast.error(`Was not able to create reminder: ${JSON.stringify(newReminder)} \n Got ${err}`);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    }
  });
};

export const useQueryUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: MutationVariables) => updateReminder(variables),

    onMutate: async (updatedReminderWithReq) => {
      const { req, ...updatedReminder } = updatedReminderWithReq;
      await queryClient.cancelQueries({ queryKey: ['reminders'] });
      const outDatedReminderList = queryClient.getQueryData(['reminders']) as DBReminder[];
      queryClient.setQueryData<InfiniteData<DBReminder[]>>(['reminders'], (oldData) => {
        return saveNewCache(oldData, updatedReminder, true);
      });
      return { outDatedReminderList };
    },

    onError: (err, updatedReminder, context) => {
      toast.error(`Was not able to update reminder with data: ${JSON.stringify(updatedReminder)} \n Got ${err}`);
      queryClient.setQueryData(['reminders'], context?.outDatedReminderList);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    }
  });
};

export const useQueryDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: MutationVariables) => deleteReminder(variables),
    onMutate: async (reminderToDelete) => {
      await queryClient.cancelQueries({ queryKey: ['reminders'] });
      const previousReminders = flat(queryClient.getQueryData(['reminders']));
      queryClient.setQueryData<InfiniteData<DBReminder[]>>(['reminders'], (oldData) => {
        return saveNewCache(oldData, reminderToDelete, false, true);
      });
      return { previousReminders };
    },
    onError: (err, deletedReminder, context) => {
      queryClient.setQueryData(['reminders'], context?.previousReminders);
      toast.error(`Was not able to delete reminder: ${JSON.stringify(deletedReminder)} \n Got ${err}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    }
  });
};

const saveNewCache = (
  oldData: InfiniteData<DBReminder[]> | undefined,
  reminderToMutate: DBReminder | MutationVariables,
  shouldUpdate?: boolean,
  shouldDelete?: boolean
) => {
  const oldOrFilteredFlatData = shouldDelete
    ? flat(oldData).filter((reminder) => reminder.id !== reminderToMutate.id)
    : flat(oldData);

  const flatDataToCache = shouldDelete
    ? oldOrFilteredFlatData
    : shouldUpdate
    ? oldOrFilteredFlatData.map((reminder) => (reminder.id === reminderToMutate.id ? reminderToMutate : reminder))
    : [reminderToMutate, ...oldOrFilteredFlatData];

  const newPages: DBReminder[][] = [];
  for (let i = 0; i < flatDataToCache.length; i += paginationPageLength) {
    newPages.push(flatDataToCache.slice(i, i + paginationPageLength) as DBReminder[]);
  }

  return { ...oldData, pages: newPages } as InfiniteData<DBReminder[]>;
};
