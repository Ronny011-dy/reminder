import styled, { css } from 'styled-components';

interface WrapperProps {
  textInput: string;
  secondary?: boolean;
  isTag?: boolean;
  done?: boolean;
}

const strikeThrough = css`
  text-decoration: line-through;
`;

const tagAdder = ({ textInput }: WrapperProps) => css`
  width: ${textInput ? textInput.length : '11'}ch;
`;

const mainTitle = ({ textInput }: WrapperProps) => css`
  width: ${textInput ? textInput.length : '13'}ch;
`;

export const Root = styled.div<WrapperProps>(
  ({ textInput, secondary, isTag, done }) => css`
    height: ${secondary ? '13' : '24'}px;
    display: flex;
    align-items: center;
    overflow-y: hidden;

    .input {
      /* width: ${textInput ? textInput.length : '14'}ch; */
      ${done && strikeThrough}
      ${isTag ? tagAdder : mainTitle}
    }

    /* .done {
      text-decoration: line-through;
    } */

    .secondary {
      opacity: 55%;
      font-size: small;
      font-weight: 700;
      height: fit-content;
    }
  `
);
