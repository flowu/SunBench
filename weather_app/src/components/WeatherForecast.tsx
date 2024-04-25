import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherEmoji from '../utils/WeatherEmoji';

interface WeatherForecast {
    time: string;
    temperature: number;
    description: string;
    icon: string;
}

const WeatherForecast: React.FC = () => {
    const [forecast, setForecast] = useState<WeatherForecast[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5000/forecast')
            .then(response => {
                setForecast(response.data);
            })
            .catch(error => {
                console.error('Error fetching forecast data:', error);
            });
    }, []);

    const halfForecast = forecast.slice(0, forecast.length / 2 - 3); // Slicing the forecast array to half its size

    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }); // Returns the day of the week like 'Monday'
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${dayName} ${time}`;
    };

    return (
        <div>
            <h2>3-Hourly Forecast</h2>
            {halfForecast.map((f, index) => (
                <div key={index}>
                    <p>{formatDate(f.time)}: {Math.round(f.temperature)}°C {f.description} <WeatherEmoji description={f.description} /></p>
                </div>
            ))}
        </div>
    );
};

export default WeatherForecast;