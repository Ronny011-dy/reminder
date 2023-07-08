import styled from 'styled-components';

import { Stack } from '@mui/material';

const Root = styled.div`
  overflow-x: auto;
  margin-bottom: 20px;
  background-color: rgba(84, 107, 140, 0.362);
  border-radius: 15px;
  padding: 10px;
`;

const ChildReminders = styled.div`
  margin-left: 50px;
`;

const Inset = styled.div`
  width: 56px;
`;

const AlignedStack = styled(Stack)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export { Root, ChildReminders, Inset, AlignedStack };
