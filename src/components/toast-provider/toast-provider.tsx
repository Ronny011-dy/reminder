import React, { Reducer, createContext, useReducer } from 'react';

import { Toast } from './ components/toast/toast';
import type {
  ToastContextType,
  ToastStateType,
  ToastProviderProps,
  Action,
} from './types';

const initialState: ToastStateType = {
  isOpen: false,
  isError: false,
  message: '',
};

const toastReducer: Reducer<ToastStateType, Action> = (
  state,
  action: Action
): ToastStateType => {
  switch (action.type) {
    case 'create': {
      return { isOpen: true, isError: false, message: 'Reminder Created!' };
    }
    case 'error-creating': {
      return {
        isOpen: true,
        isError: false,
        message: 'Error creating reminder',
      };
    }
    case 'delete': {
      return { isOpen: true, isError: false, message: 'Reminder deleted' };
    }
    case 'error-deleting': {
      return {
        isOpen: true,
        isError: true,
        message: 'Error deleting reminder',
      };
    }
    case 'error-updating': {
      return {
        isOpen: true,
        isError: true,
        message: 'Error updating reminder',
      };
    }
    case 'reset': {
      return { ...state, isOpen: false };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      <Toast />
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
