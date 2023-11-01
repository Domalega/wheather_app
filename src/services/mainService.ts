//убрать апи ключ, дописать интерфейс

import { IserverInfo } from "../models/sererInfo";

const URL_API = "https://api.openweathermap.org/data/2.5/forecast";
const URL_API_NOW = "https://api.openweathermap.org/data/2.5/weather";

const API_KEY = "599e1a1dce916d08310d27a71adec24b";

interface IData {
  cityName: string;
}

export const getData = async (cityName: string): Promise<any> => {
  const response = await fetch(
    `${URL_API}?q=${cityName}&units=metric&appid=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getDataNow = async (cityName: string): Promise<IserverInfo> => {
  const response = await fetch(
    `${URL_API_NOW}?q=${cityName}&units=metric&appid=${API_KEY}`
  );
  const data = await response.json();
  return data;
};
