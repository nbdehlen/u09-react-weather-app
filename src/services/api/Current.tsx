import { buildQueryString } from './base';

const endpoint = '/weather';

interface Params {
  q?: string;
  lat?: number;
  lon?: number;
  zip?: string;
  units?: string;
}

export const getCurrentWeather = async (params?: Params): Promise<Response> => (
  fetch(buildQueryString(endpoint, params))
);
