import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { Popover, Chip } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useReminderDoneContext } from '../../../../hooks/useReminderDoneContext';
import { useReminderIdContext } from '../../../../hooks/useReminderIdContext';
import { useQueryClientAndMutation } from '../../../../hooks/useQueryClientAndMutation';
import { updateReminderDB } from '../../../../api/functions.api';

type DatePickerProps = {
  date?: number;
};

const DatePicker: React.FC<DatePickerProps> = ({ date }) => {
  const id = useReminderIdContext();
  const done = useReminderDoneContext();
  const mutation = useQueryClientAndMutation(updateReminderDB, 'Update');
  // initializes with current date or saved date if exists
  const tempVal = date ? dayjs.unix(date) : dayjs();
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(tempVal);

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
    mutation.mutate({ id, req: { date: newDate?.unix() } });
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
          horizontal: 'left',
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
