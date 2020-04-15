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

export const FiveDayForecastGraph: React.FC<Props> = ({ data, unit, hilo }: Props) => {
  const [hiTemp, setHiTemp] = useState<number[]>([]);
  const [loTemp, setLoTemp] = useState<number[]>([]);

  useEffect(() => {
    if (hilo.list) {
      const hiArr: number[] = [];
      const loArr: number[] = [];

      // loop over the days
      Object.values(hilo.list).forEach(
        (day: ForecastList[]) => {
          // loop over data points in current iteration of day
          day.forEach((dataPoint) => {
            // get max and min temps and push them to respective array
            // for every data point in current day
            hiArr.push(Math.max(
              ...day.map((dayItem: ForecastList) => dayItem.main.temp),
            ));
            loArr.push(
              Math.min(
                ...day.map((dayItem: ForecastList) => dayItem.main.temp),
              ),
            );
          });
        },
      );
      setHiTemp(hiArr);
      setLoTemp(loArr);
    }
  }, [hilo.list]);

  // Replace date labels with days of the week
  const dateLabels = (value: string, index: number): string | undefined => {
    const search = /02:00/;
    if (search.exec(value) || index === 0) {
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
                    labels: data.list.map((x: ForecastList) => (moment.unix(x.dt).format('YYYY-MM-DD HH:mm'))),
                    datasets: [
                      {
                        type: 'line',
                        label: 'Temperature',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        borderColor: 'rgba(255,255,255,0.3)',
                        data: data.list.map((x: ForecastList) => (x.main.temp)),
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
                        borderColor: 'rgba(255, 138, 5, 0.6)',
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
                        borderColor: 'rgba(49, 91, 155, 1)',
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
                      backgroundColor: 'rgba(45, 55, 72, 1)',

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
                          callback(value: string): string {
                            return `${value} °${unit}`;
                          },
                        },
                      },
                      ],
                      xAxes: [{
                        gridLines: {
                          offsetGridLines: true,
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
                          callback(value: string, index: number): string | undefined {
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
