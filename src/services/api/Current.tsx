import { buildQueryString } from './base';

const endpoint = '/weather';

interface Params {
  q?: string;
  lat?: string;
  lon?: string;
  zip?: string;
  units?: string;
}

export const getCurrentWeather = async (params?: Params): Promise<Response> => (
  fetch(buildQueryString(endpoint, params))
);
