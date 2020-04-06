import React from 'react';
import { Card } from './Card';
import { Weather } from '../interfaces';
import { round } from '../utilities';

export const CurrentWeather: React.FC<any> = ({ data, unit }: any) => {
  const weather = data.weather ? data.weather[0] : null;

  return (
    <>
      {weather ? (
        <Card>
          <div className="flex flex-col justify-center items-center text-center">
            <div className="flex items-center justify-evenly w-full">
              <img
                src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt=""
              />
              <div>
                <p className="text-white text-4xl">
                  <span className="mr-1">{round(data.main.temp)}</span>
                  <sup className="text-2xl">
                    &deg;
                    {unit}
                  </sup>
                </p>
                <p>
                  Feels like:
                  {' '}
                  {data.main.feels_like}
                  &deg;
                  {unit}
                </p>
              </div>
            </div>
            <p>
              Low:
              {round(data.main.temp_min)}
              &deg;
              {unit}
            </p>
            <p>
              High:
              {round(data.main.temp_max)}
              &deg;
              {unit}
            </p>
            <div className="flex justify-between w-full">
              <div className="flex items-center">
                {`${data.main.pressure} hPa`}
                <sup>2</sup>
              </div>
              <div className="flex items-center">
                {`${data.wind.speed} ${unit === 'C' ? 'km/h' : 'mp/h'}`}
              </div>
            </div>
          </div>
        </Card>
      ) : (
        ''
      )}
    </>
  );
};
