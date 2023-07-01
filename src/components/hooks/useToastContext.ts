import { useContext } from 'react';
import { ToastContextType } from '../toast-wrapper/types';
import { ToastContext } from '../toast-wrapper/toast-wrapper';

export const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToastContext must be used within ToastWrapper');
  }

  return context;
};
