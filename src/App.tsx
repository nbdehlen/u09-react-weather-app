import React, { useState } from 'react';
import { API_KEY } from './API_KEY';
import { GeoLocation } from './interfaces';

const App: React.FC = () => {
  const [location, setLocation] = useState('');

  const fetchFormLocation = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`;
    // console.log(URL);

    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);

    return (
      <div>
        {' '}
        {JSON.stringify(data)}
        {' '}
      </div>
    );
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchFormLocation();
    setLocation('');
  };

  const fetchGeoWeather = async (position: any) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`;
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
  };

  const fetchGeolocation = () => {
    const successCallback = (position: any) => {
      console.log(position);
      fetchGeoWeather(position);
    };
    const errorCallback = (error: any) => { console.log(error); };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };


  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <button type="submit"> Search </button>
      </form>


      <div>
        <button type="button" onClick={fetchGeolocation}> Get my location </button>
      </div>
    </div>
  );
};

export default App;
