import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

interface CashIconsProps {
    count: number;  // Number of cash icons to display
}

const CashIcons: React.FC<CashIconsProps> = ({ count }) => {
    return (
        <div>
            {Array.from({ length: count }, (_, i) => (
                <FontAwesomeIcon key={i} icon={faMoneyBillWave} style={{ marginRight: '5px' }} />
            ))}
        </div>
    );
};

export default CashIcons;
