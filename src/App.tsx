import React, { useState, useEffect } from 'react';
import { GeoLocation, WeatherData } from './interfaces';
import { getForecast } from './services/api';
import { Weather } from './components/Weather';
import './App.css';

export const App: React.FC = () => {
  const [location, setLocation] = useState('');
  const [curWeather, setCurWeather] = useState<WeatherData>({});

  const fetchWeather = (params: any) => {
    getForecast(params)
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

      <Weather data={curWeather} />
    </div>
  );
};
