import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {
  WiHumidity, WiBarometer, WiSunrise, WiSunset,
} from 'react-icons/wi';
import { FaWind } from 'react-icons/fa';
import { Card } from './Card';
import { Toggle } from './Toggle';
import { WeatherIcon } from './WeatherIcon';
import { round, degreeDescription } from '../utilities';
import { ForecastList, GroupedForecastList } from '../types/weather';
import { WindDirectionIcon } from './WindDirectionIcon';

interface Props {
  data: GroupedForecastList;
  city: any;
  unit: string;
}

export const FiveDayForecast: React.FC<Props> = ({ data, city, unit }: Props) => {
  const unitText = `°${unit === 'C' ? 'C' : 'F'}`;
  const momentFormat = unit === 'C' ? 'HH:mm' : 'h:mm a';
  const defaults = {
    color: 'text-gray-600',
    backgroundColor: 'bg-gray-800',
    toggledBackgroundColor: 'bg-gray-700',
    toggledColor: 'text-gray-500',
    toggledStyle:
      { background: 'linear-gradient(0deg, rgb(74, 85, 104) 90%, rgba(45,55,72,1) 100%)' },
  };

  if (!data.list) {
    return <></>;
  }

  return (
    <>
      <Card
        title={(
          <div className="flex flex-row flex-wrap justify-between">
            <div>Forecast</div>
            <div className="flex flex-row flex-wrap items-center text-gray-400">
              <WiSunrise className="w-5 h-5 mx-3 text-orange-400" />
              {moment.unix(city.sunrise).format(momentFormat)}
              <WiSunset className="w-5 h-5 mx-3 text-blue-400" />
              {moment.unix(city.sunset).format(momentFormat)}
            </div>
          </div>
        )}
        titleSmall
      >
        <ul className="grid grid-cols-1 gap-4">
          {Object.entries(data.list).map(
            ([key, day]: [string, ForecastList[]]) => {
              // Highest temperature of the day
              const highestTemp = Math.max.apply(
                Math,
                day.map((dayItem: ForecastList) => dayItem.main.temp),
              );
              // Lowest temperature of the day
              const lowestTemp = Math.min.apply(
                Math,
                day.map((dayItem: ForecastList) => dayItem.main.temp),
              );

              // Get mean values
              const dayMean = {
                temp: _.meanBy(day, (d: ForecastList) => d.main.temp),
                humidity: _.meanBy(day, (d: ForecastList) => d.main.humidity),
                pressure: _.meanBy(day, (d: ForecastList) => d.main.pressure),
                speed: _.meanBy(day, (d: ForecastList) => d.wind.speed),
              };

              /*
               * Find closest average values from mean value
               */
              const chain = _.chain(day);

              const dayAvgPressure = chain
                .map('main')
                .flatten()
                .reduce((a, b) => (Math.abs(a.pressure - dayMean.pressure)
                  <= Math.abs(b.pressure - dayMean.pressure)
                  ? a
                  : b))
                .value();
              const dayAvgHumidity = chain
                .map('main')
                .flatten()
                .reduce((a, b) => (Math.abs(a.humidity - dayMean.humidity)
                  <= Math.abs(b.humidity - dayMean.humidity)
                  ? a
                  : b))
                .value();
              const dayAvgWind = chain
                .map('wind')
                .flatten()
                .reduce((a, b) => (Math.abs(a.speed - dayMean.speed)
                  <= Math.abs(b.speed - dayMean.speed)
                  ? a
                  : b))
                .value();
              const dayAvgTempIcon = chain
                .reduce((a, b) => (Math.abs(a.main.temp - dayMean.temp)
                  <= Math.abs(b.main.temp - dayMean.temp)
                  ? a
                  : b))
                .value().weather[0].icon;

              return (
                <li key={key}>
                  <Toggle
                    content={(
                      <div
                        className={`flex flex-row flex-wrap items-center ${defaults.color} ${defaults.backgroundColor} py-2 px-4 rounded text-sm sm:text-base`}
                      >
                        <div className="w-24">
                          <p className="text-md text-white font-bold uppercase">
                            {moment(key, 'YYYY_M_D').format('dddd')}
                          </p>
                          <p className="text-sm text-gray-500">
                            {moment(key, 'YYYY_M_D').format('MMMM Do')}
                          </p>
                        </div>
                        <div className="flex-1">
                          <WeatherIcon
                            icon={dayAvgTempIcon}
                            className="mx-auto"
                          />
                        </div>
                        <div className="flex-1 flex flex-col flex-wrap">
                          <div className="w-12 sm:w-16 whitespace-no-wrap text-right">
                            <p>
                              <span className="mr-1 text-gray-300 font-bold">
                                {round(highestTemp)}
                              </span>
                              <span>{unitText}</span>
                            </p>
                            <p>
                              <span className="mr-1 text-gray-300">
                                {round(lowestTemp)}
                              </span>
                              <span>{unitText}</span>
                            </p>
                          </div>
                        </div>
                        <div
                          className="flex-1 text-center self-start"
                          title="Average wind speed"
                        >
                          <FaWind className="mx-auto w-5 h-8" />
                          <div className="flex items-center text-sm">
                            <span
                              className="text-gray-400"
                              title={degreeDescription(dayAvgWind.deg)}
                            >
                              <WindDirectionIcon degree={dayAvgWind.deg} />
                            </span>
                            <span className="text-gray-400">
                              {round(dayAvgWind.speed)}
                            </span>
                            <span className="text-gray-600">
                              &nbsp;
                              {unit === 'C' ? 'm/s' : 'm/h'}
                            </span>
                          </div>
                        </div>
                        <div
                          className="flex-1 text-center self-start"
                          title="Average humidity"
                        >
                          <WiHumidity className="mx-auto w-8 h-8" />
                          <span className="text-gray-400 text-sm">
                            {`${dayAvgHumidity.humidity} `}
                            <span className="text-gray-600">%</span>
                          </span>
                        </div>
                        <div
                          className="flex-1 text-center self-start"
                          title="Average pressure"
                        >
                          <WiBarometer className="mx-auto w-8 h-8" />
                          <span className="text-gray-400 text-sm">{`${dayAvgPressure.pressure} `}</span>
                          <span className="text-gray-600">hPa</span>
                        </div>
                      </div>
                    )}
                    toggledcontent={(
                      <div
                        className={`flex flex-row flex-wrap items-center ${defaults.toggledColor} ${defaults.toggledBackgroundColor} py-2 px-4 rounded`}
                        style={defaults.toggledStyle}
                      >
                        <div className="w-24">
                          <p className="text-md text-white font-bold uppercase">
                            {moment(key, 'YYYY_M_D').format('dddd')}
                          </p>
                          <p className="text-sm text-gray-500">
                            {moment(key, 'YYYY_M_D').format('MMMM Do')}
                          </p>
                        </div>
                        <div className="flex-1" />
                        <div className="flex-1 " />
                        <FaWind className="flex-1 w-8 h-5" title="Wind speed" />
                        <WiHumidity
                          className="flex-1 w-8 h-8"
                          title="Humidity"
                        />
                        <WiBarometer
                          className="flex-1 w-8 h-8"
                          title="Pressure"
                        />
                      </div>
                    )}
                  >
                    <ul>
                      {day.map((item: ForecastList) => (
                        <li
                          key={item.dt}
                          className="flex flex-row flex-wrap items-center text-center text-gray-400 bg-gray-800 odd:bg-gray-900 px-4 rounded"
                        >
                          <div className="flex-1 text-gray-300 font-bold">
                            {moment.unix(item.dt).format(momentFormat)}
                          </div>

                          <div className="flex-1">
                            <WeatherIcon
                              icon={item.weather[0].icon}
                              className="mx-auto"
                            />
                          </div>
                          <div className="flex-1 flex flex-wrap">
                            <p className="w-12 sm:w-16 whitespace-no-wrap text-right">
                              <span className="text-gray-300 font-bold">
                                {round(item.main.temp)}
                              </span>
                              <span className="text-gray-600">{` ${unitText}`}</span>
                            </p>
                          </div>
                          <div className="flex-1 flex flex-row flex-wrap items-center sm:whitespace-no-wrap">
                            <span title={degreeDescription(item.wind.deg)}>
                              <WindDirectionIcon degree={item.wind.deg} />
                            </span>
                            <span>{round(item.wind.speed)}</span>
                            <span className="text-gray-600">
                              &nbsp;
                              {unit === 'C' ? 'm/s' : 'm/h'}
                            </span>
                          </div>
                          <div className="flex-1">
                            {`${item.main.humidity} `}
                            <span className="text-gray-600">%</span>
                          </div>
                          <div className="flex-1">
                            {`${item.main.pressure} `}
                            <span className="text-gray-600">hPa</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Toggle>
                </li>
              );
            },
          )}
        </ul>
      </Card>
    </>
  );
};
