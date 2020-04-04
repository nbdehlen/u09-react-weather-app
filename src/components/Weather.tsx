import React, { useState, useEffect } from 'react';
import { API_KEY } from '../API_KEY';
import { GeoLocation, WeatherData } from '../interfaces';
import { Card } from './Card';
import { getForecast } from '../services/api';

export const Weather: React.FC = () => {
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
    const errorCallback = (error: any) => { console.log(error); };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" className="text-gray-900" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <button type="submit"> Search </button>
      </form>


      <div>
        <button type="button" onClick={fetchGeolocation}> Get my location </button>
      </div>

      {curWeather.list
        ? (
          <>
            <div>
              City:
              {' '}
              {curWeather.city?.name}
            </div>
            <div>
              Sunrise:
              {' '}
              {curWeather.city?.sunrise}
            </div>
            <div>
              Sunset:
              {' '}
              {curWeather.city?.sunset}
            </div>
            <br />
            <div className="grid grid-cols-6 gap-4">
              {curWeather.list.map((x: any) => (
                <div
                  key={x.dt}
                >
                  <div>
                    Date:
                    <br />
                    {x.dt_txt}
                  </div>

                  <div>
                    {`Temp: ${x.main.temp}`}
                  </div>

                  <div>
                    {`Humidity: ${x.main.humidity}`}
                  </div>

                  <div>
                    {`Wind: ${x.wind.speed}`}
                  </div>
                </div>
              ))}
            </div>
          </>
        )

        : ('')}
    </div>
  );
};
