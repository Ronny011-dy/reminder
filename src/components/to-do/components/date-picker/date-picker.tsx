import { Popover, Chip } from '@mui/material';
import React from 'react';
import { useState } from 'react';

import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type DatePickerProps = {
  date?: number;
  done?: boolean;
};

const dateParser = (date: number) => new Date(date).toLocaleDateString('de-DE');

const DatePicker: React.FC<DatePickerProps> = ({ date, done }) => {
  //popover logic
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  //?event: React.MouseEvent<HTMLDivElement>
  const openCalendarHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    // console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const closeCalendarHandler = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      {date && (
        <Chip
          label={`Due: ${dateParser(date)}`}
          variant="outlined"
          size="small"
          onClick={openCalendarHandler}
        />
      )}
      {!done && (
        <Chip
          size="small"
          label="Add date"
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
          <DateCalendar />{' '}
        </LocalizationProvider>
      </Popover>
    </>
  );
};

export { DatePicker };
