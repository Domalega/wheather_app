import React, { useState } from "react";
import { getData } from "../services/mainService";
import { IserverInfoList } from "../models/sererInfo";
import CardWeatherHour from "./ui/cardWeatherHour";

const WeatherPart: React.FC = () => {
  const [serverData, setServerData] = useState<IserverInfoList>();
  const [inputValue, setInputValue] = useState<any>("");
  const [errorInputValue, setErrorInputValue] = useState<string>("");

  const fetchDataToStartPart = async (value: any) => {
    try {
      const data: IserverInfoList = await getData(value);
      console.log(data);
      if (data.cod != 200) {
        setErrorInputValue("Uncorrect city name! Try again");
        return;
      }
      setErrorInputValue("");
      setServerData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchClick = () => {
    fetchDataToStartPart(inputValue);
  };

  return (
    <div className="h-screen bg-slate-500">
      <div className="h-screen grid md:grid-flow-col gap-4 items-center">
        <div className="flex m-4 items-center justify-center">
          <div className="w-3/4 here need a fix">
            <p className="flex items-center justify-around text-2xl text-white">
              <img src="weatherIcons/04d.svg" className="h-20" />
              Find the weather!
            </p>

            <div className="w-full flex gap-2">
              <input
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                className="w-full rounded py-2 px-2"
              />
              <button
                className="bg-white rounded px-10"
                onClick={handleSearchClick}
              >
                Find
              </button>
            </div>
            {errorInputValue && <div>{errorInputValue}</div>}
          </div>
        </div>
        {serverData && (
          <div className="grid md:grid-cols-2 overflow-auto h-1/2 my-4">
            {serverData.list.map((hourInfo) => (
              <>
                <CardWeatherHour
                  key={hourInfo.dt}
                  cardInfo={hourInfo}
                  colorBg="bg-white/20"
                  colorText="text-white"
                />
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPart;
