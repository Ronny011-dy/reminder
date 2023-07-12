import styled, { css } from 'styled-components';

import { Stack } from '@mui/material';

interface WrapperProps {
  isChild: boolean;
}

const Root = styled.div<WrapperProps>(
  ({ isChild }) => css`
    overflow-x: auto;
    margin-bottom: ${!isChild ? '20px' : '0'};
    background-color: ${!isChild && 'rgb(36, 71, 106)'};
    border-radius: 15px;
    padding: 10px;
  `
);

const ChildReminder = styled.div`
  background-color: rgb(23, 46, 69);
  border: solid 2px rgba(255, 255, 255, 0.486);
  border-radius: 15px;
  margin-left: 50px;
  margin-right: 25px;
`;

const AlignedStack = styled(Stack)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Padding = styled.div`
  height: 15px;
`;

export { Root, ChildReminder, AlignedStack, Padding };
