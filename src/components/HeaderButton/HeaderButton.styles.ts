import { IconButton } from '@mui/material';
import styled from 'styled-components';

const Root = styled(IconButton)`
  color: white !important;
  font-size: 1rem !important;
  border-radius: 5px !important;
  margin-left: 15px !important;
  &:hover {
    outline: solid 1px rgba(255, 255, 255, 0.431);
    outline-offset: -1px;
  }
`;

export { Root };
