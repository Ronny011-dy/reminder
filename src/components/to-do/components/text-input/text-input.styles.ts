import styled, { css } from 'styled-components';

interface WrapperProps {
  textInput: string;
  secondary?: boolean;
}

export const Root = styled.div<WrapperProps>(
  ({ textInput, secondary }) => css`
    height: ${secondary ? '13' : '24'}px;
    display: flex;
    align-items: center;
    overflow-y: hidden;
    .input {
      width: ${textInput ? textInput.length : '14'}ch;
    }

    .done {
      text-decoration: line-through;
    }

    .secondary {
      opacity: 55%;
      font-size: small;
      font-weight: 700;
      height: fit-content;
    }
  `
);
