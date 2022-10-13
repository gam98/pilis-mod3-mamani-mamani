import { createContext, useState } from "react";

export const WeatherCardsContext = createContext({
  weatherCards: [],
  setWeatherCards: () => {},
});

export const WeatherCardsProvider = ({ children }) => {
  const [weatherCards, setWeatherCards] = useState([]);
  const value = { weatherCards, setWeatherCards };

  return (
    <WeatherCardsContext.Provider value={value}>
      {children}
    </WeatherCardsContext.Provider>
  );
};
