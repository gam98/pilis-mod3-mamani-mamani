import "./Home.css";
import { Cards } from "../../components/Card/Cards";
import { useContext, useEffect, useState } from "react";
import { WeatherCardsContext } from "../../context/WeatherCardsContext";
import { FaSearch } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  const { weatherCards, setWeatherCards } = useContext(WeatherCardsContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const dataStored = localStorage.getItem("data");

    if (dataStored) {
      console.log("dataStored => ", dataStored);
      const dataParsed = JSON.parse(dataStored);
      setCurrentUser(dataParsed.user);
    }

    if (weatherCards.length === 0 && dataStored) {
      const dataParsed = JSON.parse(dataStored);
      setWeatherCards([...weatherCards, ...dataParsed.weathers]);
    }
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const cards = !search
    ? weatherCards
    : weatherCards.filter((weather) =>
        weather.cityName.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <main className="main-container">
      <form className="form-filter ">
        <FaSearch className="icon-search" />
        <input
          placeholder="Search"
          type="search"
          className="input-to-filter"
          onChange={handleSearch}
          value={search}
        />
      </form>
      <Cards cards={cards} search={search} currentUser={currentUser} />
    </main>
  );
};

export { Home };
