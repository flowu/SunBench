import React, { useState } from 'react';
import axios from 'axios';  // Import Axios for making HTTP requests
import CashIcons from '../utils/SummerIcons';

const TimeUntilVacation: React.FC = () => {
    const [vacationDate, setVacationDate] = useState('');

    const today = new Date();
    const vacationDay = vacationDate ? new Date(vacationDate) : null;
    const daysUntilVacation = vacationDay
        ? Math.ceil((vacationDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        : null;

    // Handle input change and update the vacation date state
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVacationDate(event.target.value);
    };

    // Function to send vacation date to the server
    const saveVacationDate = () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        console.log('API URL:', apiUrl); // Debug: Check the URL

        axios.post(`${apiUrl}/save-vacation-date`, {
            user: 'username',
            date: vacationDate
        })
        .then(response => {
            alert('Vacation date saved!');
        })
        .catch(error => {
            alert('Failed to save vacation date');
            console.error('There was an error!', error);
        });
    };

    return (
        <div>
            {/* Input field for user to provide a vacation date */}
            <label htmlFor="vacation-date">Enter your vacation date:</label>
            <input
                type="date"
                id="vacation-date"
                value={vacationDate}
                onChange={handleDateChange}
            />

            <button onClick={saveVacationDate} disabled={!vacationDate || new Date(vacationDate) <= today}>
                Save Date
            </button>

            {/* Display days remaining if a valid date is set, or a prompt if not */}
            {daysUntilVacation !== null ? (
                daysUntilVacation <= 0 ? (
                    <h3><CashIcons count={5} /> YAY VACATION!!!!!</h3>
                ) : (
                    <h3><CashIcons count={5} /> {daysUntilVacation} days until vacation!</h3>
                )
            ) : (
                <h3>Please enter a valid vacation date.</h3>
            )}
        </div>
    );
};

export default TimeUntilVacation;
