import { useContext } from 'react';
import type { ToastContextType } from '../components/ToastProvider/ToastProvider.types';
import { ToastContext } from '../components/ToastProvider/ToastProvider';

const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider');
  }

  return context;
};

export { useToastContext };
