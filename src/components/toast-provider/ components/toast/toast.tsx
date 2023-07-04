import React from 'react';

import { Snackbar, Alert } from '@mui/material';

import { ActionType } from '../../types';
import { useToastContext } from '../../../../hooks/useToastContext';

const Toast: React.FC = () => {
  const { state, dispatch } = useToastContext();
  const { isOpen, isError, message } = state;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: ActionType.Reset });
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={1000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={`${isError ? 'error' : 'success'}`} variant="outlined">
        {message}
      </Alert>
    </Snackbar>
  );
};

export { Toast };
