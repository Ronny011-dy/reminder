import { OptionWrapper } from '../../../../components/Todo/components/OptionWrapper/OptionWrapper';
import {
  Root,
  DrawerWrapper,
  InputStyled,
  SearchWrapper,
  SearchIconButton,
} from './SearchAndFilter.styles';
import { Drawer, useTheme } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useFocus } from '../../../../hooks/useFocus';
import { useRef } from 'react';
import { Filters } from '../Filters/Filters';

type SearchAndFilterProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null);
  useFocus({ inputRef, elementRendered: isOpen });
  return (
    <Root>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerWrapper theme={theme}>
          <SearchWrapper>
            <InputStyled placeholder="Search reminders" ref={inputRef} />
            <SearchIconButton>
              <OptionWrapper title="Search">
                <SearchTwoToneIcon />
              </OptionWrapper>
            </SearchIconButton>
          </SearchWrapper>
          <Filters />
        </DrawerWrapper>
      </Drawer>
    </Root>
  );
};

export { SearchAndFilter };
