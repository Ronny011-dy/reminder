import { useMutation, useQueryClient } from 'react-query';

import { useToastContext } from './useToastContext';
import { ActionType } from '../toast-provider/types';
import type { DBReminder } from '../reminder-app/types';
import type { Reminder } from '../to-do/types';

type MutationVariables = {
  id?: string;
  req?: Partial<Reminder>;
};

const useQueryClientAndMutation = (
  dbQueryFunction:
    | (() => Promise<DBReminder[]>)
    | ((obj: MutationVariables) => Promise<DBReminder[]>),
  action: string,
  isShowSuccess?: boolean
) => {
  const { dispatch } = useToastContext();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (variables: MutationVariables) => dbQueryFunction(variables),
    onSuccess: () => {
      isShowSuccess && dispatch({ type: ActionType[action] });
      queryClient.invalidateQueries(['reminders']);
    },
    onError: () => {
      dispatch({ type: ActionType[`ErrorOn${action}`] });
    },
  });

  return mutation;
};

export { useQueryClientAndMutation };
export type { MutationVariables };
