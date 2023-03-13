import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useContext, useState } from 'react';
import { EndDateContext, StartDateContext } from '../context/Context';

export default function Calendar() {
  const {setStartDate} = useContext(StartDateContext);
  const {setEndDate} = useContext(EndDateContext);

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const today = new Date();
  
  const wrongDates = [
    new Date(2023, 2, 15),
    new Date(2023, 2, 16),
    new Date(2023, 2, 17),
  ];

  const wrongDatesSec: number[] = [];
  for (let index = 0; index < wrongDates.length; index++) {
    const element = wrongDates[index];
    wrongDatesSec.push(Date.parse(element.toString()));
  }

  function disablePrevDates(startDate: Date) {
    const startSeconds = Date.parse(startDate.toString());
    return (date: Date) => {
      return Date.parse(date.toString()) < startSeconds;
    }
  }

  function disableDate(today: Date){
    const startSeconds = Date.parse(today.toString());

    return (date: Date) => {
      if (Date.parse(date.toString()) < startSeconds){
        return true;
      }
      const sec = Date.parse(date.toString());
      
      if (wrongDatesSec.includes(sec)){
        return true;
      }
      else {
        return false;
      }
    }
  }

  const handleStartDateChange = (startDate: Date | null) => {
    setSelectedStartDate(startDate);
    if (startDate){
      setStartDate(startDate);
    }
  }

  const handleEndDateChange = (endDate: Date | null) => {
    setSelectedEndDate(endDate);
    if (endDate){
      setEndDate(endDate);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='flex flex-row'>
          <DatePicker label="Start Date" value={selectedStartDate} onChange={handleStartDateChange} format="DD-MM-YYYY" shouldDisableDate={disableDate(today)}/>
          <DatePicker label="End Date" value={selectedEndDate} onChange={handleEndDateChange} format="DD-MM-YYYY" shouldDisableDate={disablePrevDates(today)}/>
        </div>
    </LocalizationProvider>
  );
}