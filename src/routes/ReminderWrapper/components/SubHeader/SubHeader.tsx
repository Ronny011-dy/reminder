import { useTheme } from '@mui/material';
import { CreateReminder } from '../../../../components/Header/components/CreateReminder/CreateReminder';
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import { Root } from './SubHeader.styles';
import { HeaderButton } from '../../../../components/HeaderButton/HeaderButton';
import { forwardRef, useState } from 'react';
import { SearchAndFilter } from '../SearchAndFilter/SearchAndFilter';

type SubHeaderProps = {
  searchHandler: React.Dispatch<React.SetStateAction<string>>;
  filterHandler: React.Dispatch<React.SetStateAction<string[]>>;
  onCreate?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubHeader = forwardRef<HTMLDivElement, SubHeaderProps>(
  ({ onCreate, searchHandler, filterHandler }, ref) => {
    const theme = useTheme();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    return (
      <Root ref={ref} theme={theme}>
        <SearchAndFilter
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
          onSearch={searchHandler}
          onFilter={filterHandler}
        />
        <CreateReminder onCreate={onCreate} />
        <HeaderButton onClick={() => setIsDrawerOpen(true)}>
          <FilterListTwoToneIcon />
          Search and Filter
        </HeaderButton>
      </Root>
    );
  }
);

export { SubHeader };
