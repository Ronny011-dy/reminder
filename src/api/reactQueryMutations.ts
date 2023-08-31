import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import type { ContextType, MutationVariables } from './types';
import { ReminderToMove, addNewReminder, deleteReminder, moveReminder, updateReminderDebounce } from './reminders';
import { flat } from '../routes/ReminderWrapper/utils/ReminderWrapper.util';
import { DbReminder } from '../routes/ReminderWrapper/ReminderWrapper.types';
import { paginationPageLength } from '../common/values';

interface optimisticDragProps {
  oldData?: InfiniteData<DbReminder[]>;
  reminderToMove: DbReminder | MutationVariables | ReminderToMove;
}

export const useQueryCreate = () => {
  const queryClient = useQueryClient();

  return useMutation<DbReminder[], unknown, DbReminder>({
    mutationFn: (variables: DbReminder) => addNewReminder(variables),

    onMutate: async (newReminder) => {
      await queryClient.cancelQueries({ queryKey: ['reminders'] });
      const previousReminders = flat(queryClient.getQueryData(['reminders']));

      queryClient.setQueryData<InfiniteData<DbReminder[]>>(['reminders'], (oldData) => ({
        ...oldData,
        pageParams: [...(oldData?.pageParams || []), { cursor: newReminder.id }],
        pages: oldData
          ? oldData.pages[0].length < paginationPageLength
            ? [[newReminder, ...oldData.pages[0]], ...oldData.pages.slice(1)]
            : [[newReminder], ...oldData.pages]
          : []
      }));
      return { previousReminders };
    },

    onError: (err, newReminder, context) => {
      // inferring context type in the arguments breaks the overload
      const tempContext = context as ContextType;
      queryClient.setQueryData(['reminders'], tempContext.previousReminders);
      toast.error(`Was not able to create reminder: ${JSON.stringify(newReminder.title)} \n Got ${err}`);
    }
  });
};

export const useQueryUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: MutationVariables) => updateReminderDebounce(variables),

    onMutate: async (updatedReminderWithReq) => {
      const { req, ...updatedReminder } = updatedReminderWithReq;
      await queryClient.cancelQueries({ queryKey: ['reminders'] });
      const outDatedReminderList = queryClient.getQueryData(['reminders']) as DbReminder[];
      queryClient.setQueryData<InfiniteData<DbReminder[]>>(['reminders'], (oldData) => ({
        ...oldData,
        pageParams: oldData?.pageParams || [],
        pages: oldData
          ? oldData.pages.map((page) =>
              page.map((reminder) => (reminder.id === updatedReminder.id ? updatedReminder : reminder))
            )
          : []
      }));

      return { outDatedReminderList };
    },

    onError: (err, updatedReminder, context) => {
      toast.error(`Was not able to update reminder with data: ${JSON.stringify(updatedReminder.title)} \n Got ${err}`);
      queryClient.setQueryData(['reminders'], context?.outDatedReminderList);
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
      queryClient.setQueryData<InfiniteData<DbReminder[]>>(['reminders'], (oldData) => ({
        ...oldData,
        pageParams: oldData?.pageParams || [],
        pages: oldData
          ? oldData.pages.map((page) => page.filter((reminder) => reminder.id !== reminderToDelete.id))
          : []
      }));

      return { previousReminders };
    },
    onError: (err, reminderToDelete, context) => {
      queryClient.setQueryData(['reminders'], context?.previousReminders);
      toast.error(`Was not able to delete reminder: ${JSON.stringify(reminderToDelete.title)} \n Got ${err}`);
    }
  });
};

export const useQueryMove = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: ReminderToMove) => moveReminder(variables),
    onMutate: async (reminderToMove) => {
      await queryClient.cancelQueries({ queryKey: ['reminders'] });
      const previousReminders = flat(queryClient.getQueryData(['reminders']));
      queryClient.setQueryData<InfiniteData<DbReminder[]>>(['reminders'], (oldData) => {
        return optimisticDrag({ oldData, reminderToMove });
      });
      return { previousReminders };
    },
    onError: (err, reminderToMove, context) => {
      queryClient.setQueryData(['reminders'], context?.previousReminders);
      toast.error(
        `Was not able to change position for reminder: ${JSON.stringify(
          reminderToMove.sourceReminder.title
        )} \n Got ${err}`
      );
    }
  });
};

const optimisticDrag = ({ oldData, reminderToMove }: optimisticDragProps) => {
  let flatDataToCache = flat(oldData);

  const { sourceReminder, destinationReminder } = reminderToMove as ReminderToMove;
  const indexOfSource = flatDataToCache.indexOf(sourceReminder);
  const indexOfDestination = flatDataToCache.indexOf(destinationReminder);

  flatDataToCache.splice(indexOfSource, 1);
  flatDataToCache.splice(indexOfDestination, 0, sourceReminder);

  const newPages: DbReminder[][] = [];
  for (let i = 0; i < flatDataToCache.length; i += paginationPageLength) {
    newPages.push(flatDataToCache.slice(i, i + paginationPageLength) as DbReminder[]);
  }

  return { ...oldData, pages: newPages } as InfiniteData<DbReminder[]>;
};

export const useDebouncedRemindersDeletion = () => {
  const useQueryDeleteWithoutOptimistic = () => {
    return useMutation({
      mutationFn: (variables: MutationVariables) => deleteReminder(variables),
      onError: (variables, err) => {
        toast.error(`Was not able to delete reminder: ${JSON.stringify(variables)} \n Got ${err}`);
      }
    });
  };
  const queryClient = useQueryClient();
  // state if remidners to remove from Db
  const [remindersToDelete, setRemindersToDelete] = useState<DbReminder[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const deleteMutation = useQueryDeleteWithoutOptimistic();

  const addReminderToDelete = useCallback(
    // optimitstic update outside of mutation
    async (reminderToDelete: DbReminder) => {
      await queryClient.cancelQueries({ queryKey: ['reminders'] });
      queryClient.setQueryData<InfiniteData<DbReminder[]>>(['reminders'], (oldData) => ({
        ...oldData,
        pageParams: oldData?.pageParams || [],
        pages: oldData
          ? oldData.pages.map((page) => page.filter((reminder) => reminder.id !== reminderToDelete.id))
          : []
      }));

      setRemindersToDelete((prevReminders) => [...prevReminders, reminderToDelete]);

      timeoutRef.current && clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        // make sure the new state is included but avoid duplication
        [...new Set(remindersToDelete.concat([reminderToDelete]))].forEach((reminderToDelete) => {
          deleteMutation.mutate({ ...reminderToDelete });
        });
        setRemindersToDelete([]);
      }, 1000);
    },
    [remindersToDelete, timeoutRef.current]
  );
  return addReminderToDelete;
};
