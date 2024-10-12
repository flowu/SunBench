import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

interface SummerIconsProps {
    count: number;  // Number of cash icons to display
}

const SummerIcons: React.FC<SummerIconsProps> = ({ count }) => {
    return (
        <div>
            {Array.from({ length: count }, (_, i) => (
                <FontAwesomeIcon key={i} icon={faSun} style={{ marginRight: '5px' }} />
            ))}
        </div>
    );
};

export default SummerIcons;
