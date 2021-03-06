
export interface ForecastList {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface GroupedForecastList {
  list?: {
    [key: string]: ForecastList[];
  };
}

export interface Forecast {
  cod?: string;
  message?: number | string;
  cnt?: number;
  list?: ForecastList[];
  city?: {
    id?: number;
    name?: string;
    coord?: {
      lat?: number;
      lon?: number;
    };
    country?: string;
    population?: number;
    timezone?: number;
    sunrise?: number;
    sunset?: number;
  };
}

export interface Weather {
  coord?: {
    lon?: number;
    lat?: number;
  };
  weather?: [
    {
      id?: number;
      main?: string;
      description?: string;
      icon?: string;
    }
  ];
  base?: string;
  main?: {
    temp?: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    humidity?: number;
  };
  visibility?: number;
  wind?: {
    speed?: number;
    deg?: number;
  };
  clouds?: {
    all?: number;
  };
  dt?: number;
  sys?: {
    type?: number;
    id?: number;
    country?: string;
    sunrise?: number;
    sunset?: number;
  };
  timezone?: number;
  id?: number;
  name?: string;
  cod?: number | string;
  message?: string;
}

export interface WeatherParams {
  lat?: number;
  lon?: number;
  q?: string;
  units?: string;
  zip?: string;
}
