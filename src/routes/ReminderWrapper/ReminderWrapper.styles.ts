import styled, { css } from 'styled-components';
import { paginationPageLength } from '../../common/values';

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

export const LeftMenu = styled.div``;

export const StyledListsWrapper = styled.div<StyledReminderListProps>(
  ({ opacity }) => css`
    opacity: ${opacity};
    display: flex;
    flex-direction: row;
    gap: 20px;
  `
);

export const StyledNewReminderAndListWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
