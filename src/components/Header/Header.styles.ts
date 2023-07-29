import styled, { css } from 'styled-components';
const Root = styled.div(
  ({ theme }) => css`
    background-color: ${theme.palette.primary.main};
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: end;
    padding-left: 10px;
    color: white;
    height: 10vh;
    border-radius: 0px 0px 15px 15px;
    div {
      width: 100%;
      max-width: 1440px;
      height: fit-content;
    }
  `
);

// const Root = styled('div')(({ theme }) => ({
//   width: 300,
//   background: theme.palette.primary.main,
//   '& .MuiSlider-thumb': {
//     '&:hover, &.Mui-focusVisible': {
//       boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
//     },
//   },
// }));

export { Root };
