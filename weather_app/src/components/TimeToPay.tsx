import React from 'react';
import CashIcons from '../utils/CashIcons';

const TimeToPay: React.FC = () => {
    const today = new Date();
    let payDay = new Date(today.getFullYear(), today.getMonth(), 25); // Set pay day to the 25th of the current month

    // Check if pay day falls on a weekend
    if (payDay.getDay() === 0) { // Sunday
        payDay.setDate(payDay.getDate() - 2); // Pay on Friday
    } else if (payDay.getDay() === 6) { // Saturday
        payDay.setDate(payDay.getDate() - 1); // Pay on Friday
    }

    const daysUntilPay = Math.ceil((payDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div>
            {daysUntilPay === 0 ? (
                <h3><CashIcons count={5} /> YAY PAYDAY!!!!!</h3>
            ) : daysUntilPay === 1 ? (
                <h3> Tomorrow is PAYDAY!!!!!</h3>
            ) : (
                <h3><CashIcons count={5} /> {daysUntilPay} days until pay day!</h3>
            )}
        </div>
    );
};

export default TimeToPay;
