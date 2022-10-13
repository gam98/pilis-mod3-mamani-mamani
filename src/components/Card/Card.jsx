import "./Card.css";
import { FaHeart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { getImageByCode, getWeather } from "../../api/service";
import { Link } from "react-router-dom";
import { FaEllipsisH, FaTrashAlt, FaStar } from "react-icons/fa";
import { WeatherCardsContext } from "../../context/WeatherCardsContext";

const Card = ({ card }) => {
  // const { id, temperature, latitude, longitude, city, windspeed, weathercode } =
  //   card;
  const { id, weathercode } = card;
  const [weather, setWeather] = useState(card);

  const { weatherCards, setWeatherCards } = useContext(WeatherCardsContext);

  const [dataParsed, setDataParsed] = useState({});

  const [weatherImage, setWeatherImage] = useState({});

  let dataStored;

  useEffect(() => {
    dataStored = localStorage.getItem("data");
    setDataParsed(JSON.parse(dataStored));

    if (!weather.temperature) {
      getWeather(weather)
        .then((response) => {
          setWeather({ ...response, id });
          getImageByCode(response.current_weather.weathercode)
            .then((response) => {
              setWeatherImage(response);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));

      return;
    }

    getImageByCode(weathercode)
      .then((response) => {
        setWeatherImage(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEliminate = () => {
    const filteredData = weatherCards.filter((weather) => weather.id !== id);
    setWeatherCards(filteredData);
    localStorage.setItem(
      "data",
      JSON.stringify({ user: dataParsed.user, weathers: [...filteredData] })
    );
  };

  return (
    <section className="card glassmorphism">
      <div className="top-bar">
        <span className="day">Day</span>
        <div className="top-bar-action">
          <FaEllipsisH className="menu-dropdown" />
          <div className="top-bar-btn-actions">
            <FaTrashAlt className="btn delete" onClick={handleEliminate} />
            <FaStar className="btn favorite" />
          </div>
        </div>
      </div>

      <img
        className="time"
        src={weatherImage.day?.path}
        alt={"weatherImage?.description[0]"}
      />

      <h2 className="temperature">
        {weather.temperature
          ? weather.temperature
          : weather.current_weather?.temperature}
        °C
      </h2>

      <h3 className="city">{weather.timezone}</h3>

      <div className="details">
        <div className="detail">
          <span className="detail-name">Wind speed</span>
          <p className="detail-number">
            {weather.temperature
              ? weather.temperature
              : weather.current_weather?.windspeed}
            <span className="unit-of-measurement">km</span>
          </p>
        </div>

        <div className="detail">
          <span className="detail-name">Longitude</span>
          <p className="detail-number">
            {weather.longitude}
            <span className="unit-of-measurement"></span>
          </p>
        </div>

        <div className="detail">
          <span className="detail-name">Latitude</span>
          <p className="detail-number">{weather.latitude}</p>
        </div>
      </div>

      <div className="actions">
        <Link className="btn show-more" to={`/weather-card/${weather.id}`}>
          Show more
        </Link>
      </div>
    </section>
  );
};

export { Card };
