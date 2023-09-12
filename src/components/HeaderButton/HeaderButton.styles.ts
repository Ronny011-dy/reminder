import { IconButton } from '@mui/material';
import styled, { css } from 'styled-components';
import { commonBorderRadius } from '../../common/values';

interface RootProps {
  $nonheader?: boolean;
}

const nonheaderStyling = () => css`
  align-self: center;
  margin-bottom: 20px !important;
  font-weight: bold;
`;

export const Root = styled(IconButton)<RootProps>(
  ({ $nonheader }) => css`
    height: ${$nonheader ? '128px' : 'fit-content'};
  `
);

export const StyledWrapper = styled.div<RootProps>(
  ({ $nonheader }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin: 0 !important;
    padding: 8px !important;
    ${$nonheader && nonheaderStyling}
    width: fit-content;
    font-size: 1rem !important;
    border-radius: ${commonBorderRadius}px !important;
    &:hover {
      outline: solid 1px rgba(255, 255, 255, 0.431);
      outline-offset: -1px;
    }
  `
);
