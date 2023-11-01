import React from "react";
import "../../styles/startPart.css";

import { ItextInfo } from "../../models/cardInfo";

const CardInfo: React.FC<{
  cardInfo: ItextInfo;
  colorBg: string;
  colorText: string;
}> = ({ cardInfo, colorBg, colorText }) => {
  return (
    <div
      className={`${colorText} w-3/4 max-h-full backdrop-blur-xl ${colorBg} rounded-lg self-center p-4`}
    >
      <div className="flex flex-col gap-2">
        <div className="border-b-2">
          <h2 className="text-3xl font-extrabold p-4">{cardInfo.header}</h2>
        </div>
        <p>{cardInfo.text}</p>
      </div>
    </div>
  );
};

export default CardInfo;