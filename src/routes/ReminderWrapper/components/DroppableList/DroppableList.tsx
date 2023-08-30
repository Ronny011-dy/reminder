import { ReactNode } from 'react';
import { Root } from './DroppableList.styles';

type DroppableListProps = {
  children: ReactNode;
  innerRef: (element: HTMLElement | null) => void;
};

export const DroppableList: React.FC<DroppableListProps> = ({ children, innerRef }) => {
  return (
    <Root
      disablePadding
      ref={innerRef}
    >
      {children}
    </Root>
  );
};
