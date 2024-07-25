import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker(props) {
  const { label, setDate } = props;

  const changeHandler = (event) => {
    setDate(String(event["$y"]).concat(String(event["$M"]+ 1))
      .concat(String(event["$D"]))); // e.g. 20240725 for July 25, 2024 (month is zero-based)
  } ;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label={label} onChange={changeHandler} />
      </DemoContainer>
    </LocalizationProvider>
  );
}