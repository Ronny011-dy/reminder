import { IconButton } from '@mui/material';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TagInput = styled.div`
  margin-top: 1px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 7px;
  height: 23px;
  border: 1px solid #bdbdbd;
  border-radius: 16px;
  input {
    border: none;
    outline: none;
    background-color: transparent;
    width: 7.8ch;
  }
`;

const AddButton = styled(IconButton)`
  padding: 0 !important;
  padding-right: 2px !important;
  color: #bdbdbd !important;
  &:hover {
    color: rgb(30, 30, 30) !important;
  }
`;

export { Root, TagInput, AddButton };
