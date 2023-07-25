import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 35px;
  font-weight: bold;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
`;

const IconWrapper = styled.div`
  transition: all 0.15s ease-in-out;
  opacity: 25%;
  &:hover {
    opacity: 100%;
  }
`;

export { Root, IconWrapper };
