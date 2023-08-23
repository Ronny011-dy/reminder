import styled, { css } from 'styled-components';

interface StyledListItemTextProps {
  secondary?: boolean;
  $done?: boolean;
  isSelected?: boolean;
}

export const Root = styled.div<StyledListItemTextProps>(
  ({ $done, isSelected, secondary }) => css`
    text-decoration: ${$done ? 'line-through' : 'none'};
    opacity: ${$done || secondary ? '50%' : '100%'};
    margin-right: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(30vw - ${isSelected ? '2' : '0'}vw);
    max-width: 50ch;
    @media (max-width: 610px) {
      width: 20vw;
    }
  `
);

export const StyledTextInput = styled.input`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 1rem;
`;
