import styled from 'styled-components';

import { Skeleton } from '@mui/material';

const Root = styled.div`
  margin-top: 15px;
`;

const TitleStyled = styled(Skeleton)`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const ReminderStyled = styled.div`
  padding: 10px;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TextStyled = styled(Skeleton)`
  margin-left: 45px;
`;

const BottomTextStyled = styled(Skeleton)`
  margin-left: 75px;
`;

const OptionsStyled = styled(Skeleton)`
  margin-left: 30%;
`;

export {
  Root,
  TitleStyled,
  ReminderStyled,
  TextStyled,
  BottomTextStyled,
  OptionsStyled,
};
