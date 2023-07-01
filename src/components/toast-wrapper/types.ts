import { ReactNode } from 'react';

export type ToastWrapperProps = {
  children: ReactNode;
};

export type ToastStateType = {
  isOpen: boolean;
  isError: boolean;
  message: string;
};

export type ToastContextType = {
  state: ToastStateType;
  dispatch: React.Dispatch<Action>;
};

export enum ActionType {
  Create = 'create',
  ErrorCreating = 'error-creating',
  Delete = 'delete',
  ErrorDeleting = 'error-deleting',
  Reset = 'reset',
}

interface CreateAction {
  type: ActionType.Create;
}

interface ErrorCreatingAction {
  type: ActionType.ErrorCreating;
}

interface DeleteAction {
  type: ActionType.Delete;
}

interface ErrorDeletingAction {
  type: ActionType.ErrorDeleting;
}

interface ResetAction {
  type: ActionType.Reset;
}

export type Action =
  | CreateAction
  | ErrorCreatingAction
  | DeleteAction
  | ErrorDeletingAction
  | ResetAction;
