import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { Popover, Chip } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useReminderDoneContext } from '../../hooks/useReminderDoneContext';
import { useCurrentReminderContext } from '../../../../routes/ReminderWrapper/hooks/useCurrentReminderContext';
import type { DatePickerProps } from './DatePicker.types';
import { useQueryUpdate } from '../../../../api/reactQueryMutations';

const DatePicker: React.FC<DatePickerProps> = ({ date }) => {
  const id = useCurrentReminderContext();
  const done = useReminderDoneContext();
  const mutation = useQueryUpdate();
  // initializes with current date or saved date if exists
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(date ? dayjs.unix(date) : dayjs());

  //popover logic
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const openCalendarHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeCalendarHandler = () => {
    setAnchorEl(null);
  };

  const dateChangeHandler = (newDate: dayjs.Dayjs | null) => {
    setAnchorEl(null);
    setDateValue(newDate);
    mutation?.mutate({ id, req: { date: String(newDate?.unix()) } });
  };

  const deleteDateHandler = () => {
    mutation?.mutate({ id, req: { date: undefined } });
  };

  const open = Boolean(anchorEl);
  return (
    <>
      {date && (
        <Chip
          label={`Due ${dateValue?.format('DD/MM/YYYY')}`}
          variant="outlined"
          size="small"
          onClick={openCalendarHandler}
          disabled={done}
          onDelete={deleteDateHandler}
        />
      )}
      {!done && !date && (
        <Chip
          size="small"
          label="Add due date"
          variant="outlined"
          onClick={openCalendarHandler}
        />
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={closeCalendarHandler}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {' '}
          <DateCalendar
            autoFocus
            value={dateValue}
            onChange={(newValue) => {
              dateChangeHandler(newValue);
            }}
          />{' '}
        </LocalizationProvider>
      </Popover>
    </>
  );
};

export { DatePicker };
