import { IconButton, Theme } from '@mui/material';
import styled, { css } from 'styled-components';

interface RootProps {
  $nonheader?: boolean;
}

const nonheaderStyling = () => css`
  align-self: center;
  margin-bottom: 20px !important;
  font-weight: bold;
`;

const Root = styled(IconButton)<RootProps>(
  ({ $nonheader, theme }) => css`
    ${$nonheader && nonheaderStyling}
    width: fit-content;
    font-size: 1rem !important;
    border-radius: 5px !important;
    &:hover {
      outline: solid 1px rgba(255, 255, 255, 0.431);
      outline-offset: -1px;
    }
  `
);

export { Root };
