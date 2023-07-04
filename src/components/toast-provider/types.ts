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
  Create = 'create',
  ErrorOnCreate = 'error-creating',
  Delete = 'delete',
  ErrorOnDelete = 'error-deleting',
  ErrorOnUpdate = 'error-updating',
  Reset = 'reset',
}

interface CreateAction {
  type: ActionType.Create;
}

interface ErrorCreatingAction {
  type: ActionType.ErrorOnCreate;
}

interface DeleteAction {
  type: ActionType.Delete;
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
  | CreateAction
  | ErrorCreatingAction
  | DeleteAction
  | ErrorDeletingAction
  | ResetAction
  | ErrorUpdatingAction;

export type { ToastProviderProps, ToastStateType, ToastContextType, Action };
export { ActionType };
