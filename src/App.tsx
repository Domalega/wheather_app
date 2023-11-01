import React from "react";
import StartPart from "./components/startPart";
import WeatherPart from "./components/weatherPart";

const App: React.FC = () => {
  return (
    <div>
      <StartPart />
      <WeatherPart />
    </div>
  );
};

export default App;
