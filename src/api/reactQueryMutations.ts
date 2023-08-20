import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

//? should I use or delete this type
import type { MutationVariables } from './types';
import { addNewReminder, deleteReminder, updateReminder } from './reminders';
import { flat } from '../routes/ReminderWrapper/utils/ReminderWrapper.util';
import { DBReminder } from '../routes/ReminderWrapper/ReminderWrapper.types';

interface ReminderMutationType {
  id: string;
  req?: {
    title?: string;
    done?: boolean;
    date?: string;
    important?: boolean;
    tags?: string;
  };
}

interface ContextType {
  previousReminders: DBReminder[];
}

export const useQueryCreate = () => {
  const queryClient = useQueryClient();
  return useMutation<DBReminder[], unknown, DBReminder>({
    mutationFn: (variables: ReminderMutationType) => addNewReminder(variables),
    onMutate: async (newReminder) => {
      await queryClient.cancelQueries({ queryKey: ['reminders'] });
      const previousReminders = flat(queryClient.getQueryData(['reminders']));
      queryClient.setQueryData<InfiniteData<DBReminder[]>>(['reminders'], (oldData) => {
        // we want to add the reminder to the top of the list
        const pageIndex = 0;
        const oldPage = oldData?.pages[pageIndex] || [];
        const newPage = [newReminder, ...oldPage];
        const newPages = oldData?.pages && [...oldData?.pages];
        if (newPages) newPages[pageIndex] = newPage;
        return { ...oldData, pages: newPages } as InfiniteData<DBReminder[]>;
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
    mutationFn: (variables: ReminderMutationType) => updateReminder(variables),
    onMutate: async (updatedReminder) => {
      await queryClient.cancelQueries({ queryKey: ['reminders', updatedReminder.id] });
      const previousReminder = queryClient.getQueryData(['reminders', updatedReminder.id]) as DBReminder;
      queryClient.setQueryData(['reminders', updatedReminder.id], updatedReminder);
      return { previousReminder, updatedReminder };
    },
    onError: (err, updatedReminder, context) => {
      toast.error(`Was not able to update reminder with data: ${JSON.stringify(updatedReminder)} \n Got ${err}`);
      queryClient.setQueryData(['reminders', updatedReminder.id], context?.previousReminder);
    },
    onSettled: (updatedReminder) => {
      queryClient.invalidateQueries({ queryKey: ['reminders', updatedReminder?.id] });
    }
  });
};

export const useQueryDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: ReminderMutationType) => deleteReminder(variables),
    onMutate: async (deletedReminder) => {
      await queryClient.cancelQueries({ queryKey: ['reminders'] });
      const previousReminders = flat(queryClient.getQueryData(['reminders']));
      queryClient.setQueryData(['reminders'], (old: DBReminder[] | undefined) =>
        old ? old.filter((reminder) => reminder.id !== deletedReminder.id) : previousReminders
      );
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
