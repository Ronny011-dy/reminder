import { useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import { Root } from './SubHeader.styles';
import { HeaderButton } from '../../../../components/HeaderButton/HeaderButton';
import { forwardRef, useState } from 'react';
import { SearchAndFilter } from '../SearchAndFilter/SearchAndFilter';

type SubHeaderProps = {
  searchHandler: React.Dispatch<React.SetStateAction<string>>;
  setTagsToFilterArr: React.Dispatch<React.SetStateAction<string[]>>;
  onCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SubHeader = forwardRef<HTMLDivElement, SubHeaderProps>(
  ({ onCreate, searchHandler, setTagsToFilterArr }, ref) => {
    const theme = useTheme();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    return (
      <Root
        ref={ref}
        theme={theme}
      >
        <SearchAndFilter
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
          onSearch={searchHandler}
          setTagsToFilterArr={setTagsToFilterArr}
        />
        <HeaderButton onClick={() => onCreate(true)}>
          <AddIcon />
          Create a reminder
        </HeaderButton>
        <HeaderButton onClick={() => setIsDrawerOpen(true)}>
          <FilterListTwoToneIcon />
          Search and Filter
        </HeaderButton>
      </Root>
    );
  }
);
