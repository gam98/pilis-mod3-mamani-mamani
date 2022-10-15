import "./Card.css";
import { useContext, useEffect, useState } from "react";
import { getImageByCode, getWeather } from "../../api/service";
import { Link } from "react-router-dom";
import { FaEllipsisH, FaTrashAlt } from "react-icons/fa";
import { WeatherCardsContext } from "../../context/WeatherCardsContext";

const Card = ({ card }) => {
  const { id, weathercode } = card;

  const { weatherCards, setWeatherCards } = useContext(WeatherCardsContext);

  const [weather, setWeather] = useState(card);

  const [dataParsed, setDataParsed] = useState({});

  const [weatherImageContent, setWeatherImageContent] = useState({});

  useEffect(() => {
    const dataStored = localStorage.getItem("data");
    setDataParsed(JSON.parse(dataStored));

    if (!weather.temperature) {
      getWeather(weather)
        .then((response) => {
          setWeather({ ...response, cityName: weather.cityName, id });

          configTime(
            response.current_weather.time,
            response.current_weather.weathercode
          );
        })
        .catch((error) => console.log(error));

      return;
    }

    const time = weather.time.slice(11, 13);

    configTime(time, weathercode);
  }, []);

  const configTime = (time, code) => {
    getImageByCode(code)
      .then((response) => {
        if (Number(time) > 19 || Number(time) < 7) {
          setWeatherImageContent({
            momentTime: "Night",
            momentImage: response.night.path,
          });
        } else {
          setWeatherImageContent({
            momentTime: "Day",
            momentImage: response.day.path,
          });
        }
      })
      .catch((error) => console.log(error));
  };

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
        <span>{weatherImageContent.momentTime}</span>
        <div className="top-bar-action">
          <FaEllipsisH className="menu-dropdown" />
          <div className="top-bar-btn-actions">
            <FaTrashAlt className="btn delete" onClick={handleEliminate} />
          </div>
        </div>
      </div>

      <img
        className="time"
        src={weatherImageContent.momentImage}
        alt="icon weather"
      />

      <h2 className="temperature">
        {weather.temperature
          ? weather.temperature
          : weather.current_weather?.temperature}
        °C
      </h2>

      <h3 className="city">{weather.cityName}</h3>

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
