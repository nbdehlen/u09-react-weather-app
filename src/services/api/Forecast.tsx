import { buildQueryString } from './base';

const forecastEndpoint = '/forecast';

interface Params {
  q?: string;
  lat?: string;
  lon?: string;
}

export const getForecast = async (params?: Params): Promise<Response> => (
  fetch(buildQueryString(forecastEndpoint, params))
);
