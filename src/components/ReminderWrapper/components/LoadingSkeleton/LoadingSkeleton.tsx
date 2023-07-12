import { Skeleton } from '@mui/material';

import {
  Root,
  TitleStyled,
  ReminderStyled,
  TextStyled,
  BottomTextStyled,
  OptionsStyled,
} from './LoadingSkeleton.styles';

const LoadingSkeleton: React.FC = () => {
  return (
    <Root>
      <TitleStyled animation="wave" height={50} width="20%" />
      <ReminderStyled>
        <Skeleton variant="circular" width={20} height={20} animation="wave" />
        <TextStyled animation="wave" height={30} width="50%" />
        <OptionsStyled animation="wave" height={30} width="10%" />
      </ReminderStyled>
      <BottomTextStyled animation="wave" height={20} width="20%" />
      <ReminderStyled>
        <Skeleton variant="circular" width={20} height={20} animation="wave" />
        <TextStyled animation="wave" height={30} width="50%" />
        <OptionsStyled animation="wave" height={30} width="10%" />
      </ReminderStyled>
      <BottomTextStyled animation="wave" height={20} width="20%" />
    </Root>
  );
};

export { LoadingSkeleton };
