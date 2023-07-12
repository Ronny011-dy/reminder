import { ReactNode } from 'react';

type ToastProviderProps = {
  children: ReactNode;
};

type ToastStateType = {
  isOpen: boolean;
  isError: boolean;
  message: string;
};

type ToastContextType = {
  state: ToastStateType;
  dispatch: React.Dispatch<Action>;
};

enum ActionType {
  ErrorOnCreate = 'error-creating',
  ErrorOnDelete = 'error-deleting',
  ErrorOnUpdate = 'error-updating',
  Reset = 'reset',
}

interface ErrorCreatingAction {
  type: ActionType.ErrorOnCreate;
}

interface ErrorDeletingAction {
  type: ActionType.ErrorOnDelete;
}

interface ErrorUpdatingAction {
  type: ActionType.ErrorOnUpdate;
}

interface ResetAction {
  type: ActionType.Reset;
}

type Action =
  | ErrorCreatingAction
  | ErrorDeletingAction
  | ErrorUpdatingAction
  | ResetAction;

export type { ToastProviderProps, ToastStateType, ToastContextType, Action };
export { ActionType };
