import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
 .action {
    opacity: 25%;
    &:hover {
      opacity: 100%;
    }
  }
  .secondary{
    opacity: 55%;
    font-size: small !important;
    font-weight: 700 !important;
  }
`;

export const WrapperDiv = styled.div`
  border: 2px solid rgb(198, 198, 198);
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  padding: 20px;

  .main-title-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;

    .main-title {
      font-family: 'Pacifico', cursive;
      font-size: 35px;
      font-weight: bold;
    }
    .add-reminder {
      margin-left: 5px;
      transition: all 0.15s ease-in-out;
    }
  }
`;
