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
  width: ${textInput ? textInput.length + 5 : '12'}ch;
`;

const mainTitle = ({ textInput }: WrapperProps) => css`
  margin-right: 10px;
  width: ${textInput ? textInput.length : '13'}ch;
`;

const description = ({ textInput }: WrapperProps) => css`
  width: ${textInput ? textInput.length + 5 : '2'}ch;
  opacity: 55%;
  font-size: small;
  font-weight: 700;
  height: fit-content;
`;

const Root = styled.div<WrapperProps>(
  ({ textInput, secondary, isTag, done }) => css`
    height: ${secondary ? '13' : '24'}px;
    display: flex;
    align-items: center;
    overflow-y: hidden;

    .input {
      ${isTag && tagAdder}
      ${!isTag && mainTitle}
      ${secondary && description}
      ${done && strikeThrough}
    }
  `
);

export { Root };
