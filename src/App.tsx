import React, { useState, useEffect, ChangeEvent } from 'react';
import moment from 'moment';
import { FaLocationArrow, FaSearch } from 'react-icons/fa';
import { Weather, Forecast } from './interfaces';
import { getForecast, getCurrentWeather } from './services/api';
import { FiveDayForecast } from './components/FiveDayForecast';
import { CurrentWeather } from './components/CurrentWeather';
import { usePrevious } from './utilities';
import './App.css';
<<<<<<< HEAD
import { AddFavorite } from './components/AddFavorite';
import { FavoritesList } from './components/FavoritesList';
=======
import { Searchbar } from './components/Searchbar';
import { InputField } from './components/InputField';
import { Navbar, NavbarItemType } from './components/Navbar';
>>>>>>> origin/master

export const App: React.FC = () => {
  const [location, setLocation] = useState('');
  const [weatherParams, setWeatherParams] = useState<any>({});
  const [curForecast, setCurForecast] = useState<Forecast>({});
  const [curWeather, setCurWeather] = useState<Weather>({});
  const [units, setUnits] = useState('metric');
  const [unit, setUnit] = useState('C');
  const prevWeatherParams = usePrevious(weatherParams);
  const prevUnits = usePrevious(units);

<<<<<<< HEAD
  const fetchWeather = (params: any) => {
    getForecast(params)
      .then((res) => res.json())
      .then((result) => {
        setCurForecast(result);
        console.log(result);
      });

    getCurrentWeather(params)
      .then((res) => res.json())
      .then((result) => {
        setCurWeather(result);
      });
=======
  const unitToggle = (): void => {
    setUnit(unit === 'C' ? 'F' : 'C');
    setUnits(units === 'metric' ? 'imperial' : 'metric');
>>>>>>> origin/master
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
<<<<<<< HEAD

    const errorCallback = (error: any) => {
=======
    const errorCallback = (error: any): void => {
>>>>>>> origin/master
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
            console.log(result);
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
<<<<<<< HEAD
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="text-gray-900"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <button type="button" onClick={fetchGeolocation}>
          {' '}
          Get my location{' '}
        </button>
      </div>

      <FiveDayForecast data={curForecast} />
      <AddFavorite location={curWeather.name} />
      <FavoritesList data={curForecast} />
    </div>
=======
    <>
      <Navbar
        fluid
        sticky
        backgroundColor="black"
        brand="Site name"
        items={[
          {
            type: NavbarItemType.Button,
            text: 'Favorites',
            color: 'white',
            order: 0,
          },
          {
            type: NavbarItemType.Toggle,
            text: 'Units:',
            toggleText: `°${unit}`,
            onClick: unitToggle,
            order: 1,
          },
        ]}
      />
      <div className="max-w-screen-xl mx-auto">
        <Searchbar>
          <form className="w-full" onSubmit={handleSearch}>
            <div className="flex flex-row flex-wrap justify-center">
              <div className="w-3/4 mr-3">
                <InputField
                  type="text"
                  placeholder="Search"
                  className="text-gray-900"
                  value={location}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => setLocation(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="hover:text-white transition duration-100 ease-in"
              >
                <FaSearch />
              </button>
            </div>
          </form>
          <div className="mt-3">
            <button
              type="button"
              className="flex flex-wrap items-center"
              onClick={fetchGeolocation}
            >
              <FaLocationArrow className="mr-2" />
              <span className="hover:text-white transition duration-100 ease-in">
                Detect my location
              </span>
            </button>
          </div>
        </Searchbar>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 mx-4 my-12">
          <div className="col-span-6 sm:col-span-2 lg:col-span-3 xl:col-span-6">
            {curWeather.name ? (
              <h2 className="text-3xl">
                {curWeather.name}
                <small className="text-gray-500 ml-2">
                  {moment
                    .unix(curWeather.dt || 0)
                    .format(units === 'metric' ? 'HH:mm MMM Do' : 'h:mm MMM Do')}
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
            <FiveDayForecast data={curForecast} />
          </div>
        </div>
      </div>
    </>
>>>>>>> origin/master
  );
};
