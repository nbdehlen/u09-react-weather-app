import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { Card } from './Card';
import { ForecastList, Forecast, GroupedForecastList } from '../types/weather';

interface Props {
  data: Forecast;
  unit: string;
  hilo: GroupedForecastList;
}

export const FiveDayForecastGraph: React.FC<any> = ({ data, unit, hilo }: Props) => {
  const [hiTemp, setHiTemp] = useState([]);
  const [loTemp, setLoTemp] = useState([]);

  //
  // Date tooltips for graph is local, needs to be location dependant.


  useEffect(() => {
    if (hilo.list) {
      const hiArr: any = [];
      const loArr: any = [];
      Object.entries(hilo.list).map(
        ([key, day]: [string, ForecastList[]]) => {
          // Highest temperature of the day
          // const highTemp = Math.max.apply(
          //   Math,
          //   day.map((dayItem: ForecastList) => dayItem.main.temp),
          // );

          // Lowest temperature of the day
          // const lowTemp = Math.min.apply(
          //   Math,
          //   day.map((dayItem: ForecastList) => dayItem.main.temp),
          // );

          // Add high and low daily values for each temperature data point
          day.forEach((dataPont) => (hiArr.push(Math.max(
            ...day.map((dayItem: ForecastList) => dayItem.main.temp),
          )),
          loArr.push(
            Math.min(
              ...day.map((dayItem: ForecastList) => dayItem.main.temp),
            ),
          )),
            // hiArr.push(maxDaily);
            // loArr.push(minDaily);
          );
        },
      );
      setHiTemp(hiArr);
      setLoTemp(loArr);
    }
  }, [hilo.list]);

  // Replace date labels with days of the week
  const dateLabels = (value: any, index: any) => {
    if (value.match('02:00') || index === 0) {
      return moment(value).format('dddd');
    }
  };

  return (
    <div>
      {data.list && hiTemp
        ? (
          <>

            <Card>
              <div style={{ minHeight: '320px' }}>
                <Bar
                  data={{
                    labels: data.list.map((x: any) => (moment.unix(x.dt).format('YYYY-MM-DD HH:mm'))), // data.list.map((x: any) => (x.dt_txt)),
                    datasets: [
                      {
                        type: 'line',
                        label: 'Temperature',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        borderColor: 'rgba(255,255,255,0.3)',
                        data: data.list.map((x: any) => (x.main.temp)),
                        lineTension: 0.2,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: 'rgba(217, 205, 69, 0.5)',
                        pointRadius: 4,
                        fill: false,
                        pointHitRadius: 10,
                        pointBorderWidth: 0,
                        borderWidth: 3,
                        showLine: true,
                      }, {
                        type: 'line',
                        label: 'Max',
                        borderColor: 'rgba(255, 138, 5, 0.6)', // 'rgba(174, 36, 36, 1)',
                        data: hiTemp,
                        lineTension: 0.2,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: 'rgba(217, 205, 69, 0.5)',
                        pointRadius: 0,
                        fill: false,
                        pointHitRadius: 10,
                        pointBorderWidth: 0,
                        borderWidth: 3,
                        showLine: true,
                        steppedLine: true,
                      }, {
                        type: 'line',
                        label: 'Min',
                        borderColor: 'rgba(49, 91, 155, 1)', // 'rgba(36, 86, 174, 1)',
                        data: loTemp,
                        lineTension: 0.2,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: 'rgba(217, 205, 69, 0.5)',
                        pointRadius: 0,
                        fill: false,
                        pointHitRadius: 10,
                        pointBorderWidth: 0,
                        borderWidth: 3,
                        showLine: true,
                        steppedLine: true,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    tooltips: {
                      mode: 'index',
                      bodySpacing: 6,
                      multiKeyBackground: 'rgba(255,255,255,0.3)',
                      backgroundColor: 'rgba(45, 55, 72, 1)', // 'rgba(74, 85, 104, 1)',

                    },
                    legend: {
                      display: true,
                      position: 'top',
                      labels: {
                        padding: 15,
                        boxWidth: 20,
                        fontSize: 14,
                        fontColor: 'rgba(255,255,255,0.7)',
                      },
                    },
                    title: {
                      display: true,
                      text: 'Five day Forecast',
                      fontSize: 16,
                      fontColor: 'rgba(255,255,255,0.4)',
                    },
                    scales: {
                      yAxes: [{
                        position: 'left',
                        gridLines: {
                          lineWidth: 2,
                          zeroLineColor: 'rgba(255,255,255,0.6)',
                          color: 'rgba(91,91,91,0.4)',
                          tickMarkLength: 0,
                        },
                        ticks: {
                          fontColor: 'rgba(255,255,255,0.4)',
                          fontSize: 14,
                          padding: 10,
                          callback(value: any) {
                            return `${value} °${unit}`;
                          },
                        },
                      },
                      ],
                      xAxes: [{
                        gridLines: {
                          // offsetGridLines: false,
                          lineWidth: 2,
                          color: 'rgba(91,91,91,0.6)',
                          tickMarkLength: 0,
                        },
                        display: true,
                        ticks: {
                          fontColor: 'rgba(255,255,255,0.4)',
                          padding: 14,
                          fontSize: 14,
                          autoSkip: false,
                          callback(value: any, index: any) {
                            return dateLabels(value, index);
                          },
                        },

                      },
                      ],
                    },
                  }}
                />
              </div>
            </Card>
          </>
        )

        : ('')}
    </div>
  );
};
