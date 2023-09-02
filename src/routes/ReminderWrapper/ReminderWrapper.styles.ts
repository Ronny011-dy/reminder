import styled, { css } from 'styled-components';

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

export const StyledListsWrapper = styled.div<StyledReminderListProps>(
  ({ opacity }) => css`
    opacity: ${opacity};
    display: flex;
    flex-direction: row;
    gap: 20px;
  `
);
