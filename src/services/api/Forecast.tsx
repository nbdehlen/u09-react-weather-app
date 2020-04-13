import { buildQueryString } from './base';
import { WeatherParams } from '../../types/weather';

const endpoint = '/forecast';

export const getForecast = async (params?: WeatherParams): Promise<Response> => (
  fetch(buildQueryString(endpoint, params))
);
