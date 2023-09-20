import { OptionWrapper } from '../../../../components/Todo/components/OptionWrapper/OptionWrapper';
import {
  Root,
  StyledDrawer,
  DrawerWrapper,
  InputStyled,
  SearchWrapper,
  SearchIconButton
} from './SearchAndFilter.styles';
import { useTheme } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useFocus } from '../../../../hooks/useFocus';
import { useRef, useState } from 'react';
import { Filters } from '../Filters/Filters';

type SearchAndFilterProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: React.Dispatch<React.SetStateAction<string>>;
  setTagsToFilterArr: React.Dispatch<React.SetStateAction<string[]>>;
};

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ isOpen, setIsOpen, onSearch, setTagsToFilterArr }) => {
  const [searchText, setSearchedText] = useState('');
  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
    setSearchedText(e.target.value);
  };
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null);
  useFocus({ inputRef, elementRendered: isOpen });
  return (
    <Root>
      <StyledDrawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DrawerWrapper theme={theme}>
          <SearchWrapper>
            <InputStyled
              placeholder="Search reminders"
              ref={inputRef}
              value={searchText}
              onChange={onSearchHandler}
              theme={theme}
            />
            <SearchIconButton>
              <OptionWrapper title="Search">
                <SearchTwoToneIcon />
              </OptionWrapper>
            </SearchIconButton>
          </SearchWrapper>
          <Filters setTagsToFilterArr={setTagsToFilterArr} />
        </DrawerWrapper>
      </StyledDrawer>
    </Root>
  );
};

export { SearchAndFilter };
