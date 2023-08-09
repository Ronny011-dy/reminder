import { Drawer, useTheme } from '@mui/material';
import { CreateReminder } from '../../../../components/Header/components/CreateReminder/CreateReminder';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import { Root } from './SubHeader.styles';
import { HeaderButton } from '../../../../components/HeaderButton/HeaderButton';
import { forwardRef, useState } from 'react';
import { SearchAndFilter } from '../SearchAndFilter/SearchAndFilter';

type SubHeaderProps = {
  onCreate?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubHeader = forwardRef<HTMLDivElement, SubHeaderProps>(
  ({ onCreate }, ref) => {
    const theme = useTheme();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    return (
      <Root ref={ref} theme={theme}>
        <SearchAndFilter isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
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
