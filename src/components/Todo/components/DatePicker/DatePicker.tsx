import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { Popover, Chip } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useCurrentReminderContext } from '../../../../routes/ReminderWrapper/hooks/useCurrentReminderContext';
import { useQueryUpdate } from '../../../../api/reactQueryMutations';

const DatePicker: React.FC = () => {
  const { done, id, date, ...restOfCurrentReminder } = useCurrentReminderContext();
  const mutation = useQueryUpdate();
  // initializes with current date or saved date if exists. required because date is optional
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(date ? dayjs.unix(Number(date)) : dayjs());

  //popover logic
  const [popOverAnchor, setPopOverAnchor] = useState<HTMLDivElement | null>(null);
  const openCalendarHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setPopOverAnchor(e.currentTarget);
  };

  const closeCalendarHandler = () => {
    setPopOverAnchor(null);
  };

  const dateChangeHandler = (newDate: dayjs.Dayjs | null) => {
    setPopOverAnchor(null);
    setDateValue(newDate);
    mutation?.mutate({
      id,
      done,
      date: String(newDate?.unix()),
      ...restOfCurrentReminder,
      req: { date: String(newDate?.unix()) }
    });
  };

  const deleteDateHandler = () => {
    mutation?.mutate({ id, done, date: null, ...restOfCurrentReminder, req: { date: null } });
  };

  const open = Boolean(popOverAnchor);
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
        anchorEl={popOverAnchor}
        onClose={closeCalendarHandler}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            autoFocus
            value={dateValue}
            onChange={(newValue) => {
              dateChangeHandler(newValue);
            }}
          />
        </LocalizationProvider>
      </Popover>
    </>
  );
};

export { DatePicker };
