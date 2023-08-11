import { List, ListItemText, useTheme } from '@mui/material';
import { Root, ListItemStyled, CheckboxStyled } from './Filters.styles';
import { useQueryClient } from 'react-query';
import type { DBReminder } from '../../ReminderWrapper.types';
import { useEffect, useState } from 'react';
import { filterNonUnique } from '../../utils/reminder-app.util';

type FiltersProps = {};

const Filters: React.FC<FiltersProps> = () => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const cachedData: DBReminder[] | undefined =
    queryClient.getQueryData('reminders');
  const [filters, setFilters] = useState<string[]>([]);
  useEffect(() => {
    cachedData?.map(
      (reminder) =>
        reminder.tags &&
        reminder.tags.length > 0 &&
        JSON.parse(reminder.tags).map((tag: string) => {
          !filters.includes(tag) &&
            setFilters((prev) => [...filterNonUnique(prev), tag]);
        })
    );
  }, [cachedData]);

  return (
    <Root>
      {filterNonUnique(filters).length > 0
        ? 'Filter by tag'
        : 'No available filters'}
      <List>
        {filters.slice(0, -1).map((filter, i) => (
          <ListItemStyled dense disableGutters disablePadding key={i}>
            <CheckboxStyled theme={theme} />
            <ListItemText>{filter}</ListItemText>
          </ListItemStyled>
        ))}
      </List>
    </Root>
  );
};

export { Filters };
