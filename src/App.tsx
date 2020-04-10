import React, { useState, useEffect, ChangeEvent } from 'react';
import moment from 'moment';
import { Weather, Forecast } from './interfaces';
import { getForecast, getCurrentWeather } from './services/api';
import { FiveDayForecast } from './components/FiveDayForecast';
import { CurrentWeather } from './components/CurrentWeather';
import { usePrevious } from './utilities';
import './App.css';

export const App: React.FC = () => {
  const [location, setLocation] = useState('');
  const [weatherParams, setWeatherParams] = useState<any>({});
  const [curForecast, setCurForecast] = useState<Forecast>({});
  const [curWeather, setCurWeather] = useState<Weather>({});
  const [units, setUnits] = useState('metric');
  const [unit, setUnit] = useState('C');
  const prevWeatherParams = usePrevious(weatherParams);
  const prevUnits = usePrevious(units);

  const unitToggle = (): void => {
    setUnit(unit === 'C' ? 'F' : 'C');
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const params = { q: location };
    setWeatherParams(params);
    setLocation('');
  };

  const fetchGeolocation = (): void => {
    const successCallback = (pos: any): void => {
      const params = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setWeatherParams(params);
    };
    const errorCallback = (error: any): void => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };


  useEffect(() => {
    const fetchWeather = (): void => {
      const params = { ...weatherParams, units };

      getForecast(params)
        .then((res) => res.json())
        .then((result: Forecast) => {
          if (result.cod === '200') {
            setCurForecast(result);
          } else {
            console.log('Error when fetching forecast');
          }
        });

      getCurrentWeather(params)
        .then((res) => res.json())
        .then((result: Weather) => {
          if (result.cod === 200) {
            setCurWeather(result);
            console.log(result);
          } else {
            console.log('Error when fetching current weather');
          }
        });
    };

    if (
      Object.keys(weatherParams).length > 0
      && (weatherParams !== prevWeatherParams || units !== prevUnits)
    ) {
      fetchWeather();
    }
  }, [weatherParams, prevWeatherParams, units, prevUnits]);

  return (
    <div className="m-8">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="text-gray-900 mr-2"
          value={location}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setLocation(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <button type="button" onClick={fetchGeolocation}>
          Get my location
        </button>
      </div>

      <div>
        <span className="mr-2">Units:</span>
        <button type="button" onClick={unitToggle}>
          &deg;
          {unit}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2">
        <div className="col-span-6 sm:col-span-2 lg:col-span-3 xl:col-span-6">
          {curWeather.name ? (
            <h2 className="text-3xl">
              {curWeather.name}
              <small className="text-gray-500 ml-2">
                {moment
                  .unix(curWeather.dt || 0)
                  .format(
                    units === 'metric' ? 'HH:mm MMM Do' : 'h:mm MMM Do',
                  )}
              </small>
            </h2>
          ) : (
            ''
          )}
        </div>
        <div className="col-span-6 sm:col-span-1">
          <CurrentWeather data={curWeather} unit={unit} />
        </div>
        <div className="col-span-6 sm:col-span-2 lg:col-span-3 xl:col-span-6">
          <FiveDayForecast data={curForecast} unit={unit} />
        </div>
      </div>
    </div>
  );
};
