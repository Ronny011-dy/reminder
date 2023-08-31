import styled, { css } from 'styled-components';
import { paginationPageLength } from '../../common/values';
import { ReminderList } from './components/ReminderList/ReminderList';

interface StyledReminderListProps {
  opacity: number;
}

export const Root = styled.div`
  max-width: 1440px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

export const LeftMenu = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  height: ${(106 + 20) * (paginationPageLength - 1)}px;
  margin-top: calc(3.3rem + 1.5vh);
  overflow-y: hidden;
  transition: overflow-y 0.3s ease-in-out;
  &:hover {
    overflow-y: scroll;
    padding-right: 20px;
  }
  @media (max-width: 1440px) {
    margin-top: calc(3rem + 1.5vh);
    height: ${(106 + 20) * (paginationPageLength - 2)}px;
  }
`;

export const StyledReminderListWrapper = styled.div<StyledReminderListProps>(
  ({ opacity }) => css`
    opacity: ${opacity};
  `
);
