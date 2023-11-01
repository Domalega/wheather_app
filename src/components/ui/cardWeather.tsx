import React from "react";
import "../../styles/startPart.css";
import { IserverInfo } from "../../models/sererInfo";

const CardWeather: React.FC<{ cardInfo: IserverInfo; colorBg: string }> = ({
  cardInfo,
  colorBg,
}) => {
  console.log(cardInfo.weather[0]);

  return (
    <div
      className={`text-white w-3/4  backdrop-blur-xl ${colorBg} rounded-lg self-center p-4`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center border-b-2">
          <img
            src={`https://openweathermap.org/img/wn/${cardInfo.weather[0].icon}@2x.png`}
          />
          <h2 className="text-4xl font-extrabold">
            {cardInfo.name}, {cardInfo.sys.country}
          </h2>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <p className="font-extralight text-xl">
              Tempreture now: {cardInfo.main.temp} °C
            </p>
            <p className="font-extralight text-xl">
              Feels like: <span>{cardInfo.main.feels_like}</span> °C
            </p>
          </div>
          <div>
            <p className="font-extralight text-xl">
              {cardInfo.weather[0].main},
              <span className="ml-2">{cardInfo.weather[0].description}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWeather;
