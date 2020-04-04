import { API_KEY } from '../../API_KEY';

const API_URL = 'https://api.openweathermap.org/data/2.5';

export const buildQueryString = (
  endpoint: string,
  params: any = {},
): string => {
  // Add appid to params object
  params.appid = API_KEY;

  // Build query paramater string
  const queryParams = Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');

  return `${API_URL}${endpoint}${queryParams ? `?${queryParams}` : ''} `;
};
