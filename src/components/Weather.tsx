import React from 'react';
import { Card } from './Card';

export const Weather: React.FC<any> = ({ data }: any) => (
  <div>
    {data.list
      ? (
        <>
          <div>
            City:
            {' '}
            {data.city?.name}
          </div>
          <div>
            Sunrise:
            {' '}
            {data.city?.sunrise}
          </div>
          <div>
            Sunset:
            {' '}
            {data.city?.sunset}
          </div>
          <br />
          <div className="grid grid-cols-6 gap-4">
            {data.list.map((x: any) => (
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
