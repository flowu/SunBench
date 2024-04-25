import React from 'react';
import './App.css';
import Weather from './components/Weather';
import WeatherForecast from './components/WeatherForecast';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <Weather />
            <WeatherForecast />
        </div>
    );
}

export default App;