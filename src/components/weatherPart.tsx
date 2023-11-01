import React from "react";

const WeatherPart: React.FC = () => {
  return (
    <div className="h-screen bg-emerald-100">
      <div className="h-screen grid grid-flow-col gap-4 items-center">
        <div className="flex-cols m-4">
          <p className="flex items-center justify-around text-2xl">
            <img src="weatherIcons/04d.svg" className="h-20" />
            Find the weather!
          </p>
          <input className="w-full rounded py-2" />
        </div>
        <p>sda</p>
        <p>sda</p>
        <p>sda</p>
        <p>sda</p>
      </div>
    </div>
  );
};

export default WeatherPart;
