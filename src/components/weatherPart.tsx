import React, { useState } from "react";

const WeatherPart: React.FC = () => {
  let typingTimer: NodeJS.Timeout;

  const [serverData, setServerData] = useState<any>();
  const [inputValue, setInputValue] = useState<any>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      console.log("Выполняем функцию после окончания ввода");
    }, 2000);
  };

  return (
    <div className="h-screen bg-emerald-100">
      <div className="h-screen grid md:grid-flow-col gap-4 items-center">
        <div className="flex-cols m-4">
          <p className="flex items-center justify-around text-2xl">
            <img src="weatherIcons/04d.svg" className="h-20" />
            Find the weather!
          </p>
          <input
            value={inputValue}
            onChange={handleInputChange}
            className="w-full rounded py-2"
          />
        </div>
        {!serverData && <div>ss</div>}
        {!serverData && <div>ss</div>}
      </div>
    </div>
  );
};

export default WeatherPart;
