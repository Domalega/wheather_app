interface ImainTemp {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Iweather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Isys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

export interface IserverInfo {
  base: string;
  clouds: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: ImainTemp;
  name: string;
  sys: Isys;
  timezone: number;
  visibility: number;
  weather: Iweather[];
  wind: {
    speed: number;
    deg: number;
  };
}
