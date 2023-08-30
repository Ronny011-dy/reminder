import { useContext } from 'react';

import { DisableDeleteContext } from '../../DisableDeleteProvider/DisableDeleteProvider';

export const useDisableDeleteContext = () => {
  const context = useContext(DisableDeleteContext);

  if (!context) {
    throw new Error('useDisableDeleteContext must be used within DisableDeleteProvider');
  }

  return context;
};
