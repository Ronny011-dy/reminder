import { List, ListItemText, useTheme } from '@mui/material';
import { Root, ListItemStyled, CheckboxStyled } from './Filters.styles';
import { useQueryClient } from 'react-query';
import type { DBReminder } from '../../ReminderWrapper.types';
import { useEffect, useState } from 'react';
import { filterNonUnique } from '../../utils/ReminderWrapper.util';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

interface CheckboxStates {
  [checkboxKey: string]: boolean;
}
type FiltersProps = { onCheck: React.Dispatch<React.SetStateAction<string[]>> };

const Filters: React.FC<FiltersProps> = ({ onCheck }) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const cachedData: DBReminder[] | undefined = queryClient.getQueryData('reminders');
  const [filters, setFilters] = useState<string[]>([]);
  useEffect(() => {
    cachedData?.map(
      (reminder) =>
        reminder.tags &&
        reminder.tags.length > 0 &&
        JSON.parse(reminder.tags).map((tag: string) => {
          !filters.includes(tag) && setFilters((prev) => [...filterNonUnique(prev), tag]);
        })
    );
  }, [cachedData, filters]);

  const [filtersLocalStorage, setFiltersLocalStorage] = useLocalStorage<CheckboxStates>('reminders_Filter_State', {});

  const checkBoxHandler = (filterText: string) => {
    // filter exists in locaStorage
    if (filtersLocalStorage[filterText] !== undefined) {
      // if the value was true then we are changing to false
      filtersLocalStorage[filterText] === true &&
        onCheck((prev) => prev.filter((filterTag) => filterTag !== filterText));
      // if the value was false then it means the filter doesn't exist in the filterState
      filtersLocalStorage[filterText] === false && onCheck((prev) => [...prev, filterText]);
      setFiltersLocalStorage((prev) => ({
        ...prev,
        [filterText]: !prev[filterText]
      }));
    }
    // filter doesn't exist in locaStorage
    if (filtersLocalStorage[filterText] === undefined) {
      // if the value didn't exist then we are inserting it with true state
      onCheck((prev) => [...prev, filterText]);
      setFiltersLocalStorage((prev) => ({ ...prev, [filterText]: true }));
    }
  };

  return (
    <Root>
      {filterNonUnique(filters).length > 0 ? 'Filter by tag' : 'No available filters'}
      <List>
        {filters.slice(0, -1).map((filter, i) => (
          <ListItemStyled
            dense
            disableGutters
            disablePadding
            key={i}
          >
            <CheckboxStyled
              checked={filtersLocalStorage[filter] === undefined ? false : filtersLocalStorage[filter]}
              theme={theme}
              onClick={() => checkBoxHandler(filter)}
            />
            <ListItemText>{filter}</ListItemText>
          </ListItemStyled>
        ))}
      </List>
    </Root>
  );
};

export { Filters };
