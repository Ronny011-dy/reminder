import { useContext } from 'react';
import type { ToastContextType } from '../toast-provider/types';
import { ToastContext } from '../toast-provider/toast-provider';

const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider');
  }

  return context;
};

export { useToastContext };
