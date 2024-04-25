import React from 'react';

interface WeatherEmojiProps {
    description: string | undefined;
}

const weatherToEmoji: { [key: string]: string } = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Snow': '❄️',
    'Thunderstorm': '⛈️',
    'Drizzle': '🌦️',
    'Fog': '🌫️',
    'Mist': '🌫️'
};

const WeatherEmoji: React.FC<WeatherEmojiProps> = ({ description }) => {
    const emoji = description ? weatherToEmoji[description] : '🌍'; // Default to a generic emoji if no match
    return <span>{emoji}</span>;
};

export default WeatherEmoji;
