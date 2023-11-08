import React, { useEffect, useState } from "react";
import { IserverInfo } from "../../models/sererInfo";

const CardWeatherHour: React.FC<{
  cardInfo: IserverInfo;
  colorText: string;
  colorBg: string;
}> = ({ cardInfo, colorText, colorBg }) => {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    if (cardInfo.dt) {
      setDate(new Date(cardInfo.dt * 1000).toDateString());
    }
  }, [cardInfo.dt]);

  return (
    <div
      className={`${colorText} md:w-3/4 backdrop-blur-xl ${colorBg} rounded-lg self-center p-4 m-4`}
    >
      <div className="grid gap-2">
        <p className="bg-sky-500/40 rounded p-2">
          <span className="text-2xl">Weather at: </span>
          <span className="border-b-2 text-xl">
            {date ? date.toLocaleString() : ""}
          </span>
        </p>
        <div className="flex items-center gap-4">
          <p>Tempreture: {cardInfo.main.temp}</p>
          <p>Feels like {cardInfo.main.feels_like}</p>
        </div>
        <div className="flex items-center gap-4">
          <img
            className="w-10"
            src={`https://openweathermap.org/img/wn/${cardInfo.weather[0].icon}@2x.png`}
          />
          <p>Tempreture: {cardInfo.weather[0].main}</p>
          <p>Tempreture: {cardInfo.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardWeatherHour;
