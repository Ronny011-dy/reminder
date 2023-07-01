import React from 'react';

import { Skeleton } from '@mui/material';

import { Root } from './loading-skeleton.styles';

const LoadingSkeleton: React.FC = () => {
  return (
    <Root>
      <div className="title">
        <Skeleton animation="wave" height={50} width="20%" />
      </div>{' '}
      <div className="reminder">
        <Skeleton variant="circular" width={20} height={20} animation="wave" />
        <Skeleton animation="wave" height={30} width="70%" className="text" />
        <Skeleton
          animation="wave"
          height={30}
          width="10%"
          className="options"
        />
      </div>
      <div className="reminder">
        {' '}
        <Skeleton variant="circular" width={20} height={20} animation="wave" />
        <Skeleton animation="wave" height={30} width="70%" className="text" />
        <Skeleton
          animation="wave"
          height={30}
          width="10%"
          className="options"
        />
      </div>
    </Root>
  );
};

export { LoadingSkeleton };