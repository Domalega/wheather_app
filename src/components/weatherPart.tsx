import React, { useState, useEffect } from "react";
import { getData } from "../services/mainService";
import { IserverInfoList } from "../models/sererInfo";
import CardWeatherHour from "./ui/cardWeatherHour";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WeatherPart: React.FC = () => {
  const [serverData, setServerData] = useState<IserverInfoList>();
  const [inputValue, setInputValue] = useState<string>("");
  const [errorInputValue, setErrorInputValue] = useState<string>("");
  const [slidesToShow, setSlidesToShow] = useState(2);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 1024) setSlidesToShow(1);
    else setSlidesToShow(2);
  };

  const fetchDataToStartPart = async (value: string) => {
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
                {serverData.list.map((hourInfo) => (
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
