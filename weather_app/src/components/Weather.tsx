import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BrotatingSpinner from '../utils/Spinner'; // Import custom spinner
import WeatherEmoji from '../utils/WeatherEmoji'; // Import the WeatherEmoji component

interface WeatherData {
    temperature: string;
    description: string;
    city: string;
}

// Function to determine the background color based on the weather description
function getColorForWeather(description: string | undefined) {
    if (!description) return '#fff'; // Return default color if no description is provided
    description = description.toLowerCase(); // Convert description to lower case to handle case variations
    if (description.includes("rain")) return '#a2cff0'; // Light blue for rain
    if (description.includes("clear")) return '#f7d794'; // Light yellow for clear
    if (description.includes("cloud")) return '#dfe4ea'; // Grey for cloudy
    // Add more conditions as needed
    return '#fff'; // Default white if no conditions match
}


const Weather: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(true); // State to track loading

    useEffect(() => {
        setIsLoading(true); // Set loading to true when the component mounts
        axios.get('http://localhost:5001/weather')
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
            <div className="forecast-item" style={{ maxWidth: '300px', margin: '0 auto', backgroundColor: getColorForWeather(weather?.description) }}>
                <p>Now</p>
                <p>{weather?.temperature} {weather?.description} <WeatherEmoji description={weather?.description} /></p>
            </div>
        </div>
    );
};

export default Weather;