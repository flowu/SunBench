import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BrotatingSpinner from '../utils/Spinner'; // Import custom spinner
import WeatherEmoji from '../utils/WeatherEmoji'; // Import the WeatherEmoji component

interface WeatherData {
    temperature: string;
    description: string;
    city: string;
}

const Weather: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(true); // State to track loading

    useEffect(() => {
        setIsLoading(true); // Set loading to true when the component mounts
        axios.get('http://localhost:5000/weather')
            .then(response => {
                setWeather(response.data);
                setIsLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                setIsLoading(false); // Ensure loading is set to false even if there is an error
            });
    }, []);

    // Show the spinner while the data is loading
    if (isLoading) {
        return <BrotatingSpinner />; // Use your custom spinner component here
    }

    // Show this part once the data is loaded
    return (
        <div>
            <h1>Weather in {weather?.city}</h1>
            <p>Now: {weather?.temperature}, {weather?.description} <WeatherEmoji description={weather?.description} /></p>
        </div>
    );
};

export default Weather;