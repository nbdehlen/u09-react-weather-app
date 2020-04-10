import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import moment from 'moment';
import { Card } from './Card';
import { GraphData, Forecast } from '../interfaces';


interface Props {
  data: Forecast;
  unit: string;
}

export const FiveDayForecast: React.FC<any> = ({ data, unit }: Props) => {
  console.log('gorba');

  // sunrise sunset?
  // use html tags deg; <sup> etc
  // tooltip C/F
  // style tooltip
  // Additional data in tooltip?
  // Additional graphs?
  // label dates to different format?
  // additional axis with icons?
  // länka ihop color theme

  // 
  // loop over temp
  // if [i] == 0: 
  //  if ([i]temp.substring(0,10) == [i-1]temp.substring(0,10))
  //    
  //


  const dateLabels = (value: any, index: any) => {
    if (index === 0) {
      return ('Today');
    } if (value.match('00:00:00')) {
      return moment(value).format('dddd');
    }
  };

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

            </Card>

            <div style={{ minHeight: '320px' }}>
              <Bar
                data={{
                  labels: data.list.map((x: any) => (x.dt_txt)),
                  datasets: [
                    {
                      type: 'line',
                      label: 'Temperature',
                      backgroundColor: 'rgba(255, 255, 255, 0.3)', // 'rgba(255, 255, 99, 0.7)',
                      borderColor: 'rgba(255,255,255,0.3)', // 'rgba(255,255,255,0.3)',
                      data: data.list.map((x: any) => (x.main.temp)),
                      lineTension: 0.2,
                      pointHoverRadius: 10,
                      pointHoverBackgroundColor: 'rgba(255,255,255,0.5)', // 'rgba(255, 255, 99, 0.3)',
                      pointRadius: 4,
                      fill: false,
                      pointHitRadius: 10,
                      pointBorderWidth: 0,
                      borderWidth: 3,
                      showLine: true,
                      // yAxisID: 'y-axis-1',
                      // xAxisID: 'x-axis-1',
                    }, {
                      type: 'line',
                      label: 'max',
                      // backgroundColor: 'rgba(255, 255, 255, 0.3)', // 'rgba(255, 255, 99, 0.7)',
                      borderColor: 'red', // 'rgba(255,255,255,0.3)',
                      data: [16, 13, 14, 20, 11], // data.list.map((x: any) => (x.main.temp)),
                      lineTension: 0.2,
                      pointHoverRadius: 10,
                      pointHoverBackgroundColor: 'rgba(255,255,255,0.5)', // 'rgba(255, 255, 99, 0.3)',
                      pointRadius: 4,
                      fill: false,
                      pointHitRadius: 10,
                      pointBorderWidth: 0,
                      borderWidth: 3,
                      showLine: true,
                      // yAxisID: 'y-axis-2',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  /* tooltips: {
                    mode: 'nearest',
                    intersect: true,
                  }, */
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
                      position: 'left',
                      // id: 'y-axis-1',
                      gridLines: {
                        lineWidth: 2,
                        zeroLineColor: 'rgba(255,255,255,0.6)',
                        color: 'rgba(91,91,91,0.4)', // 'rgba(255,255,255,0.25)',
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
                    /* {
                      position: 'right',
                      id: 'y-axis-2',
                      gridLines: {
                        display: false,
                      },
                      ticks: {
                        // stepSize: 4,
                        min: 1,
                        fontColor: 'rgba(255,255,255,0.4)',
                        fontSize: 14,
                        padding: 10,
                        callback(value: any) {
                          return `${value} °${unit}`;
                        },
                      },
                    }, */
                    ],
                    xAxes: [{
                      // id: 'x-axis-1',
                      gridLines: {
                        lineWidth: 2,
                        color: 'rgba(91,91,91,0.6)', // 'rgba(255,255,255,0.25)',
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
                        // min: 40,
                      },

                    },
                    // { display: false }
                    ],
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
