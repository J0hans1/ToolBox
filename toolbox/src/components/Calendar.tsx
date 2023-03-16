import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useContext, useEffect, useState } from 'react';
import { EndDateContext, StartDateContext } from '../context/Context';
import { Ad, BookedDate, NewBookedDates } from '../types/types';
import Button from '@mui/material/Button';
import { Snack, SnackbarContext } from "../context/Context";
import { addBookedDates, getAdBookedDates } from '../lib/controller';
import { useAuth } from '../context/AuthContext';
import { dateToText, findDatesBetween, validateDates } from '../lib/datecontroller';

interface AdProps {
  ad: Ad
}

export default function Calendar({ad}: AdProps) {
	const {setStartDate} = useContext(StartDateContext);
	const {setEndDate} = useContext(EndDateContext);

	const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
	const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

	const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
	const bookedDatesSec: number[] = [];

	const { setSnack } = useContext(SnackbarContext);

	const { currentUser } = useAuth();

	const today = new Date();

	async function getBookedDates() {
		const bookedDatesFromDatabase = await getAdBookedDates(ad.id);
		setBookedDates(bookedDatesFromDatabase);
	}

	useEffect(() => {
        getBookedDates()
    },[]);

	function disableDate(today: Date){
		const startSeconds = Date.parse(today.toString());
		bookedDates.forEach((d) => {
			if (d.date){
				const dateList: string[] = d.date.split(",");
				const year: number = +dateList[0];
				const month: number = +dateList[1];
				const date: number = +dateList[2];
				const newDate = new Date(year, month -1, date);
				bookedDatesSec.push(Date.parse(newDate.toString()));
			}
		})

		return (date: Date) => {
			if (Date.parse(date.toString()) < startSeconds){
			  return true;
			}
			const sec = Date.parse(date.toString());
	
			if (bookedDatesSec.includes(sec)){
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

	const handleReserve = async() => {
		if (currentUser?.id !== null && currentUser !== undefined){
			if (selectedStartDate && selectedEndDate){
				if (validateDates(selectedStartDate, selectedEndDate, bookedDatesSec)){
					const bookedDates = findDatesBetween(dateToText(selectedStartDate), dateToText(selectedEndDate));
					//updateBookedAds(ad.id, bookedDates)
					bookedDates.forEach(async date => {
						const newBookedDate: NewBookedDates = {
							userID: currentUser?.id,
							adId: ad.id,
							date: date
						}
						const res = await addBookedDates(newBookedDate);
						if (res === true) {
							setSnack(new Snack({ message: 'Produkt reservert!', color: 'success', autoHideDuration: 5000, open: true }));
						} else {
							setSnack(new Snack({ message: 'Noe gikk galt, prøv igjen senere', color: 'warning', autoHideDuration: 5000, open: true }));
						}
					});
				} else {
					setSnack(new Snack({ message: 'Ikke gyldig datoer!', color: 'error', autoHideDuration: 5000, open: true }));
				}
			}
			else{
				setSnack(new Snack({ message: 'Ikke gyldig dato!', color: 'warning', autoHideDuration: 5000, open: true }))
			}
		}
		else {
			setSnack(new Snack({ message: 'Du må logge inn for å reservere et produkt!', color: 'warning', autoHideDuration: 5000, open: true }));
		}
		
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div>
				<div className='flex flex-row'>
					<DatePicker label="Start Date" value={selectedStartDate} onChange={handleStartDateChange} format="DD-MM-YYYY" shouldDisableDate={disableDate(today)}/>
					<DatePicker label="End Date" value={selectedEndDate} onChange={handleEndDateChange} format="DD-MM-YYYY" shouldDisableDate={disableDate(today)}/>
				</div>
				<Button variant="contained" onClick={handleReserve}>Reserver produkt</Button>
			</div>
		</LocalizationProvider>
	);
}