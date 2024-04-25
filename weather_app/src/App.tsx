import React from 'react';
import './App.css';
import Weather from './components/Weather';
import WeatherForecast from './components/WeatherForecast';
import DaysUntilPay from './components/TimeToPay'; // Adjust the import path based on your file structure
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <DaysUntilPay />
            <Weather />
            <WeatherForecast />
        </div>
    );
}

export default App;