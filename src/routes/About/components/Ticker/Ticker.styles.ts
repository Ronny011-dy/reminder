import styled from 'styled-components';
import { commonBorderRadius } from '../../../../common/values';

const Root = styled.div`
  max-width: 1400px;
  height: fit-content;
  overflow: hidden;
`;

const Wrapper = styled.div`
  @keyframes ticker {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }
    100% {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }
  margin-top: 15px;
  padding-left: 285%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: ticker;
  animation-duration: 120s;
  border-radius: 0 !important;
`;

const ImgStyled = styled.img`
  height: 60px;
  width: fit-content;
  max-width: 175px;
  object-fit: scale-down;
  margin-left: 100px;
  opacity: 0.5;
  border-radius: ${commonBorderRadius}px;
  &:hover {
    opacity: 1;
    filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.22));
  }
`;

export { Root, Wrapper, ImgStyled };
