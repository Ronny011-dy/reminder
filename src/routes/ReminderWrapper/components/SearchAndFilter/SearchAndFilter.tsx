import { Root, DrawerWrapper, InputStyled } from './SearchAndFilter.styles';
import { Drawer, useTheme } from '@mui/material';

type SearchAndFilterProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const theme = useTheme();
  return (
    <Root>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerWrapper theme={theme}>
          <InputStyled placeholder="Search reminders" autoFocus></InputStyled>
          Place filters below
        </DrawerWrapper>
      </Drawer>
    </Root>
  );
};

export { SearchAndFilter };
