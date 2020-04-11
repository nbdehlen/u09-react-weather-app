import { buildQueryString } from './base';
import { WeatherParams } from '../../types/weather';

const endpoint = '/weather';

export const getCurrentWeather = async (params?: WeatherParams): Promise<Response> => (
  fetch(buildQueryString(endpoint, params))
);
