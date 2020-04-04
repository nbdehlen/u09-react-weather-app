import { buildQueryString } from './base';

const endpoint = '/forecast';

interface Params {
  q?: string;
  lat?: string;
  lon?: string;
}

export const getForecast = async (params?: Params): Promise<Response> => (
  fetch(buildQueryString(endpoint, params))
);
