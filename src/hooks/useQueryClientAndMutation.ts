import { useMutation, useQueryClient } from 'react-query';

import { useToastContext } from './useToastContext';
import { ActionType } from '../components/ToastProvider/ToastProvider.types';
import type { DBReminder } from '../components/ReminderWrapper/ReminderWrapper.types';
import type { MutationVariables } from '../api/types';

type ActionTypeString = 'Create' | 'Delete' | 'Update';

const useQueryClientAndMutation = (
  dbQueryFunction:
    | (() => Promise<DBReminder[]>)
    | ((obj: MutationVariables) => Promise<DBReminder[]>),
  action: ActionTypeString
) => {
  const errorType: keyof typeof ActionType = `ErrorOn${action}`;
  const { dispatch } = useToastContext();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (variables: MutationVariables) => dbQueryFunction(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(['reminders']);
    },
    onError: () => {
      dispatch({ type: ActionType[errorType] });
    },
  });

  return mutation;
};

export { useQueryClientAndMutation };
