import React, { useState, useEffect } from 'react';
import { GeoLocation, WeatherData } from './interfaces';
import { getForecast } from './services/api';
import { Weather } from './components/Weather';
import './App.css';

export const App: React.FC = () => {
  const [location, setLocation] = useState('');
  const [curWeather, setCurWeather] = useState<WeatherData>({});

  const fetchFormLocation = () => {
    getForecast({ q: location })
      .then((res) => res.json())
      .then((result) => {
        setCurWeather(result);
      });
    // test comment
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchFormLocation();
    setLocation('');
  };

  const fetchGeoWeather = (position: any) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getForecast({ lat, lon })
      .then((res) => res.json())
      .then((result) => {
        setCurWeather(result);
      });
  };

  const fetchGeolocation = () => {
    const successCallback = (position: any) => {
      console.log(position);
      fetchGeoWeather(position);
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
