import React, { useEffect, useState } from "react";
import "../styles/startPart.css";
import CardWeather from "./ui/cardWeather";
import { getDataNow } from "../services/mainService";
import { IserverInfo } from "../models/sererInfo";
import CardInfo from "./ui/cardInfo";
import { ItextInfo } from "../models/cardInfo";

const StartPart: React.FC = () => {
  const [data, setData] = useState<IserverInfo>();
  const [infoText, setInfoText] = useState<ItextInfo>();

  useEffect(() => {
    fetchDataToStartPart();
  }, []);

  const fetchDataToStartPart = async () => {
    try {
      const data = await getDataNow("London");
      console.log(data);

      setData(data);
      const objInfoText: ItextInfo = {
        header: "It`s new weather app!!!",
        text: "There you can find information about every place in the world! Just type city below this block! Try now!",
        icon: "sunny",
      };

      setInfoText(objInfoText);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen container-img flex flex-col">
      <h1 className="text-white text-4xl font-extrabold pl-10 pt-10">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-white from-sky-400">
          Weather
        </span>
        _App
      </h1>
      <div className="grid flex-1 h-full overflow-y-auto grid-cols-1 md:grid-cols-2 justify-stretch">
        {infoText && (
          <CardInfo
            cardInfo={infoText}
            colorBg="bg-white/30"
            colorText="text-white"
          />
        )}

        {data && <CardWeather cardInfo={data} colorBg={"bg-blue-500/40"} />}
      </div>
    </div>
  );
};

export default StartPart;
