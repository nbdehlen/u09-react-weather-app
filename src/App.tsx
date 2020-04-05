import React, { useState, useEffect } from 'react';
import { Weather, Forecast } from './interfaces';
import { getForecast, getCurrentWeather } from './services/api';
import { FiveDayForecast } from './components/FiveDayForecast';
import './App.css';


export const App: React.FC = () => {
  const [location, setLocation] = useState('');
  const [curForecast, setCurForecast] = useState<Forecast>({});
  const [curWeather, setCurWeather] = useState<Weather>({});

  const fetchWeather = (params: any) => {
    getForecast(params)
      .then((res) => res.json())
      .then((result) => {
        setCurForecast(result);
      });

    getCurrentWeather(params)
      .then((res) => res.json())
      .then((result) => {
        setCurWeather(result);
      });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchWeather({ q: location });
    setLocation('');
  };

  const fetchGeolocation = () => {
    const successCallback = (pos: any) => {
      fetchWeather({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    };
    const errorCallback = (error: any) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" className="text-gray-900" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <button type="submit">Search</button>
      </form>

      <div>
        <button type="button" onClick={fetchGeolocation}> Get my location </button>
      </div>

      <FiveDayForecast data={curForecast} />
    </div>
  );
};
