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
  counter: number;
  code: number;
  base: string;
  clouds: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  dt_text: string;
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

export interface IserverInfoList {
  cod: number;
  city: string;
  cnt: number;
  list: IserverInfo[];
  message: string;
}
