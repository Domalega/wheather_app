import React, { useState, useEffect } from "react";
import { getData } from "../services/mainService";
import { IserverInfo, IserverInfoList } from "../models/sererInfo";
import CardWeatherHour from "./ui/cardWeatherHour";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WeatherPart: React.FC = () => {
  const [serverDataFiltered, setServerDataFiltered] =
    useState<IserverInfoList>();
  const [inputValue, setInputValue] = useState<string>("");
  const [errorInputValue, setErrorInputValue] = useState<string>("");

  const fetchDataToStartPart = async (value: string) => {
    try {
      const data: IserverInfoList = await getData(value);

      if (data.cod != 200) {
        setErrorInputValue("Uncorrect city name! Try again");
        return;
      }
      filterData(data);
      setErrorInputValue("");
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = (data: IserverInfoList) => {
    const ArrayOfDays: IserverInfo[] = [];
    data.list.forEach((dataEl) => {
      const date = new Date(dataEl.dt * 1000);
      const day = date.getDay();

      if (!ArrayOfDays[day]) {
        ArrayOfDays[day] = dataEl;
        ArrayOfDays[day].counter = 1;
      } else {
        if (ArrayOfDays[day].counter !== undefined)
          ArrayOfDays[day].counter += 1;

        ArrayOfDays[day].main.feels_like += dataEl.main.feels_like;
        ArrayOfDays[day].main.temp += dataEl.main.temp;
        ArrayOfDays[day].main.temp_max += dataEl.main.temp_max;
        ArrayOfDays[day].main.temp_min += dataEl.main.temp_min;
      }
    });

    ArrayOfDays.forEach((dataEl) => {
      dataEl.main.feels_like = parseFloat(
        (dataEl.main.feels_like / dataEl.counter).toFixed(2)
      );
      dataEl.main.temp = parseFloat(
        (dataEl.main.temp / dataEl.counter).toFixed(2)
      );
      dataEl.main.temp_max = parseFloat(
        (dataEl.main.temp_max / dataEl.counter).toFixed(2)
      );
      dataEl.main.temp_min = parseFloat(
        (dataEl.main.temp_min / dataEl.counter).toFixed(2)
      );
    });

    const ArrayOfDaysList: IserverInfoList = {
      list: ArrayOfDays,
      cod: 0,
      city: "",
      cnt: 0,
      message: "",
    };

    setServerDataFiltered(ArrayOfDaysList);
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

        {serverDataFiltered && (
          <div className="overflow-auto">
            <h1 className="text-2xl text-white text-center my-2">
              Weather at
              <span className="border-b-2 font-bold">{inputValue}</span>
            </h1>
            <div className="overflow-auto">
              <Slider
                className="bg-white/20 rounded-lg mx-10"
                accessibility={true}
                speed={1000}
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesPerRow: 3,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesPerRow: 2,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                ]}
              >
                {serverDataFiltered.list.map((hourInfo) => (
                  <CardWeatherHour
                    key={hourInfo.dt}
                    cardInfo={hourInfo}
                    colorBg="bg-white/20"
                    colorText="text-white"
                  />
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPart;
