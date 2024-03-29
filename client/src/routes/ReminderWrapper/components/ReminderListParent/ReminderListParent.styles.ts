import styled from 'styled-components';
import { paginationPageLength } from '../../../../common/values';

export const Root = styled.div`
  min-width: 560px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledDroppableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  height: ${128 * (paginationPageLength - 1)}px;
  overflow-y: hidden;
  &:hover {
    overflow-y: scroll;
    padding-right: 20px;
  }
  @media (max-width: 1440px) {
    height: ${128 * (paginationPageLength - 3)}px;
  }
`;
