import { buildQueryString } from './base';

const forecastEndpoint = '/forecast';

interface ForecastParams {
  q?: string;
  lat?: string;
  lon?: string;
}

export const getForecast = async (params?: ForecastParams): Promise<Response> => (
  fetch(buildQueryString(forecastEndpoint, params))
);
