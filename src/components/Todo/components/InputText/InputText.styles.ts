import styled, { css } from 'styled-components';

interface StyledListItemTextProps {
  $done?: boolean;
}

export const Root = styled.div<StyledListItemTextProps>(
  ({ $done }) => css`
    opacity: ${$done ? '50%' : '100%'};
    ${StyledTextInput} {
      text-decoration: ${$done ? 'line-through' : 'none'} !important;
    }
  `
);

export const StyledTextInput = styled.input`
  width: 35ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  outline: none;
  border: none;
  padding: 0;
  background-color: transparent;
  font-size: 1rem;
`;
