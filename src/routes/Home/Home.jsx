import { Cards } from "../../components/Card/Cards";
import { FaSearch } from "react-icons/fa";
import "./Home.css";
import { useContext, useEffect } from "react";
import { WeatherCardsContext } from "../../context/WeatherCardsContext";

const Home = () => {
  const { weatherCards, setWeatherCards } = useContext(WeatherCardsContext);

  useEffect(() => {
    const dataStored = localStorage.getItem("data");

    if (weatherCards.length === 0 && dataStored) {
      const dataParsed = JSON.parse(dataStored);
      setWeatherCards([...weatherCards, ...dataParsed.weathers]);
    }
  }, []);

  return (
    <main className="main-container">
      {/* <form className="form-filter">
        <div className="form-group">
          <label htmlFor="search-filter"></label>
          <input
            type="text"
            id="search-filter"
            placeholder="Escribe una ciudad..."
          />
        </div>
        <button className="search-btn">
          <FaSearch />
        </button>
      </form> */}

      <Cards cards={weatherCards} />
    </main>
  );
};

export { Home };
