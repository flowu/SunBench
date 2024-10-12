import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherEmoji from '../utils/WeatherEmoji';

interface WeatherForecast {
    time: string;
    temperature: number;
    description: string;
    icon: string;
}

interface DayForecast {
    date: string;
    forecasts: WeatherForecast[];
}

// This function returns a color based on the weather description
function getColorForWeather(description: string) {
    if (description.toLowerCase().includes("rain")) return '#a2cff0'; // Light blue for rain
    if (description.toLowerCase().includes("clear")) return '#f7d794'; // Light yellow for clear
    if (description.toLowerCase().includes("cloud")) return '#dfe4ea'; // Grey for cloudy
    return '#fff'; // Default white if no match
}

// Group forecasts by day
function groupForecastsByDay(data: WeatherForecast[]): DayForecast[] {
    const groups: DayForecast[] = [];
    data.forEach((forecast) => {
        const date = forecast.time.split(' ')[0]; // Assumes format is "YYYY-MM-DD HH:MM:SS"
        let group = groups.find(g => g.date === date);
        if (!group) {
            group = { date, forecasts: [] };
            groups.push(group);
        }
        group.forecasts.push(forecast);
    });
    return groups;
}

const WeatherForecast: React.FC = () => {
    const [groupedForecasts, setGroupedForecasts] = useState<DayForecast[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5001/forecast')
            .then(response => {
                const groupedData = groupForecastsByDay(response.data);
                setGroupedForecasts(groupedData);
            })
            .catch(error => {
                console.error('Error fetching forecast data:', error);
            });
    }, []);

    // Function to group forecasts by day
    function groupForecastsByDay(data: WeatherForecast[]): DayForecast[] {
        const groups: DayForecast[] = [];
        data.forEach((forecast) => {
            const date = new Date(forecast.time).toLocaleDateString();
            let group = groups.find(g => g.date === date);
            if (!group) {
                group = { date, forecasts: [] };
                groups.push(group);
            }
            group.forecasts.push(forecast);
        });
        return groups;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    return (
        <div>
            <h2>3-Hourly Forecast for Next 3 Days</h2>
            {groupedForecasts.slice(0, 3).map((group, index) => ( // Only take the first three day groups
                <div key={index}>
                    <h3>{formatDate(group.date)}</h3>
                    <div className="forecast-container">
                        {group.forecasts.map((f, idx) => (
                            <div key={idx} className="forecast-item" style={{ backgroundColor: getColorForWeather(f.description) }}>
                                <p>{new Date(f.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                <p>{Math.round(f.temperature)}°C {f.description} <WeatherEmoji description={f.description} /></p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WeatherForecast;

