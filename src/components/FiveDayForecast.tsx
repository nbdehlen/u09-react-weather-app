import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Card } from './Card';
import { GraphData } from '../interfaces';

export const FiveDayForecast: React.FC<any> = ({ data }: any) => {
  console.log('gorba');
  const [dateModified, setDateModified] = useState();

  // Creating Custom Tick Formats for Celcius and Fahrenheit

  const dateLabels = (value: any, index: any) => {
    if (index === 0) {
      return (`${value.substring(0, 10)}\r\n${value.substring(11, 16)}`);
    } if (value.match('00:00:00')) {
      return value.substring(0, 10);
    }
    // return value;
  };


  // switch (value) {
  //   case index === 0:
  //     return value;
  //   case value.match('00:00:00'):
  //     return value.substring(0, 10);

  //   default:
  //     break;
  // }
  // };

  /* const [dataPoints, setDataPoints] = useState<GraphData>({ date: [], temp: [] });

  useEffect(() => {
    if (data.list) {
      setDataPoints(data.list.map((x: any) => (
        {
          date: x.dt_txt,
          temp: x.main.temp,
        }
      )));
    }
  }, [data.list]);

   useEffect(() => {
    if (data.list) {
      setDataPoints(data.list.map((x: any) => (
        {
          date: x.dt_txt,
          temp: x.main.temp,
        }
      )));
    }
  }, [data.list]);

  console.log(dataPoints); */

  /*
   useEffect(() => {
    if (data.list) {
      setdateModified(
        data.list.filter(x => x.)
      )
    }
  }, []) */
  // useEffect(() => {
  //   const getDate = () => {
  //     const arr2 = [];
  // let arr1 = [];
  // arr2.push(data.list[0].dt_txt);

  // for (let i = 0; i < data.list.length; i++) {
  //   if (data.list[i].dt_txt.match('00:00:00')) {
  //     arr2.push(data.list[i].dt_txt.substring(0, 10));
  //   } else if (data.list[i].dt_txt.match('12:00:00')) {
  //     arr2.push(data.list[i].dt_txt.substring(11, 16));
  //   } else {
  //     arr2.push('');
  //   }
  // }
  // arr1 = arr2.concat();
  //   setDateModified(arr2);
  // };

  //   if (data.list) {
  //     getDate();
  //   }
  // }, [data.list]);

  // console.log(dateModified);

  return (
    <div>
      {data.list
        ? (
          <>
            <Card>
              <div>
                {`City: ${data.city?.name}`}
              </div>
              <div>
                {`Sunrise: ${data.city?.sunrise}`}
              </div>
              <div>
                {`Sunset: ${data.city?.sunset}`}
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
            </Card>

            <div style={{ minHeight: '320px' }}>
              <Line
                data={{
                  labels: data.list.map((x: any) => (x.dt_txt)),
                  datasets: [
                    {
                      label: 'Temperature',
                      backgroundColor: 'rgba(255, 255, 99, 0.7)',
                      borderColor: 'rgba(255,255,255,0.3)',
                      data: data.list.map((x: any) => (x.main.temp)),
                      lineTension: 0.2,
                      pointHoverRadius: 10,
                      pointHoverBackgroundColor: 'rgba(255, 255, 99, 0.3)',
                      fill: false,
                      pointHitRadius: 10,
                      borderWidth: 3,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: 'Five day Forecast',
                    fontSize: 16,
                    fontColor: 'rgba(255,255,255,0.4)',
                  },
                  scales: {
                    yAxes: [{
                      gridLines: {
                        lineWidth: 1,
                        zeroLineColor: 'rgba(255,255,255,0.25)',
                        color: 'rgba(255,255,255,0.25)',
                        tickMarkLength: 0,
                      },
                      ticks: {
                        fontColor: 'rgba(255,255,255,0.4)',
                        fontSize: 16,
                        padding: 5,
                        // Include a dollar sign in the ticks
                        callback(value: any) {
                          return `${value} ℃/F`;
                        },
                      },
                    }],
                    xAxes: [{
                      gridLines: {
                        lineWidth: 2,
                        color: 'rgba(255,255,255,0.25)',
                        tickMarkLength: 0,
                      },
                      display: true,
                      ticks: {
                        fontColor: 'rgba(255,255,255,0.4)',
                        padding: 14,
                        fontSize: 16,
                        autoSkip: false,
                        callback(value: any, index: any) {
                          return dateLabels(value, index);
                        },
                        // min: 40,
                      },

                    }],
                  },
                }}
              />
            </div>

          </>
        )

        : ('')}
    </div>
  );
};
