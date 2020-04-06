import React from 'react';
import { FaWind } from 'react-icons/fa';
import { WiHumidity, WiBarometer } from 'react-icons/wi';
import { Card } from './Card';
import { round, degreeDescription } from '../utilities';
import { Weather } from '../interfaces';

interface Props {
  data: Weather;
  unit: string;
}

export const CurrentWeather: React.FC<Props> = ({ data, unit }: Props) => {
  const weather = data.weather ? data.weather[0] : null;
  return (
    <>
      {weather ? (
        <Card title="Current weather" titleSmall>
          <div className="flex flex-col justify-center items-center text-center">
            <div className="flex flex-wrap items-center justify-evenly w-full">
              <img
                src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt=""
              />
              <div>
                <p className="text-white text-4xl">
                  <span className="mr-1">{round(data.main?.temp)}</span>
                  <sup className="text-2xl">
                    &deg;
                    {unit}
                  </sup>
                </p>
                <p>
                  Feels like
                  {' '}
                  <span className="text-gray-400">
                    {round(data.main?.feels_like)}
                    &deg;
                    {unit}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between w-full">
              <div className="flex items-center">
                <WiHumidity className="text-3xl" />
                <span className="text-white">{`${data.main?.humidity}%`}</span>
              </div>
              <div className="flex items-center">
                <WiBarometer className="text-3xl" />
                <span className="text-white">
                  {`${data.main?.pressure} hPa`}
                </span>
              </div>
              <div className="flex items-center">
                <FaWind className="text-xl mr-2" />
                <span className="text-white">
                  {`${
                    round(data.wind?.speed)
                  } ${
                    data.wind?.deg ? degreeDescription(data.wind?.deg) : ''} ${
                    unit === 'C' ? 'm/s' : 'm/h'
                  }`}
                </span>
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
