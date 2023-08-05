import { useTheme } from '@mui/material';
import { CreateReminder } from '../../../../components/Header/components/CreateReminder/CreateReminder';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import { Root } from './SubHeader.styles';
import { HeaderButton } from '../../../../components/HeaderButton/HeaderButton';
import { forwardRef } from 'react';

type SubHeaderProps = {
  onCreate?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubHeader = forwardRef<HTMLDivElement, SubHeaderProps>(
  ({ onCreate }, ref) => {
    const theme = useTheme();

    return (
      <Root ref={ref} theme={theme}>
        <CreateReminder onCreate={onCreate} />
        <HeaderButton>
          <SearchTwoToneIcon />
          Search
        </HeaderButton>
        <HeaderButton>
          <FilterListTwoToneIcon />
          Filter by tag
        </HeaderButton>
      </Root>
    );
  }
);

export { SubHeader };
