import "./WeatherCardDisplay.css";
import { FaWind, FaTint, FaThermometerThreeQuarters } from "react-icons/fa";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { WeatherCardsContext } from "../../context/WeatherCardsContext";
import { getAllImages, getDetailsWeather } from "../../api/service";
import { useParams } from "react-router-dom";

const WeatherCardDisplay = () => {
  const { id } = useParams();
  const { weatherCards } = useContext(WeatherCardsContext);
  const [weather] = weatherCards.filter((weather) => weather.id === id);
  const [weatherInformation, setWeatherInformation] = useState(weather);
  const [currentInfo, setCurrentInfo] = useState({});
  const [todayData, setTodayData] = useState([]);
  const [nextDaysData, setNextDaysData] = useState([]);

  useEffect(() => {
    if (!weather) {
      const dataStored = localStorage.getItem("data");
      const dataParsed = JSON.parse(dataStored);

      const [weather] = dataParsed.weathers.filter(
        (weather) => weather.id === id
      );

      getInfoToShow(weather);
      return;
    }

    getInfoToShow(weather);
  }, []);

  const getInfoToShow = (value) => {
    getAllImages()
      .then((images) => {
        const getImage = (code, time = 7) => {
          const found = images.find((item) => item.code === code);
          if (Number(time) > 19 || Number(time) < 7) return found.night.path;
          return found.day.path;
        };

        const getImageDescription = (code) => {
          const found = images.find((item) => item.code === code);
          return found.description[0];
        };

        getDetailsWeather(value)
          .then((data) => {
            setWeatherInformation({ ...data, cityName: value.cityName });

            const foundIndex = data.hourly.time.findIndex(
              (item) => item === data.current_weather.time
            );

            const time = new Date(data.current_weather.time);

            setCurrentInfo({
              time: time.toDateString(),
              relativeHumidity: data.hourly.relativehumidity_2m[foundIndex],
              apparentTemperature: data.hourly.apparent_temperature[foundIndex],
              description: getImageDescription(
                data.current_weather.weathercode
              ),
              weatherImage: getImage(
                data.current_weather.weathercode,
                data.current_weather.time.slice(11, 13)
              ),
            });

            const timeFiltered = data.hourly.time.filter(
              (item) =>
                item.slice(0, 10) === data.current_weather.time.slice(0, 10)
            );

            const todayWeather = timeFiltered.map((item, index) => ({
              time: data.hourly.time[index].slice(11),
              temperature: data.hourly.temperature_2m[index],
              weatherImage: getImage(
                data.hourly.weathercode[index],
                data.hourly.time[index].slice(11, 13)
              ),
            }));

            setTodayData(todayWeather);

            const forecastNextDays = data.daily.time.map((item, index) => ({
              time: parseDate(data.daily.time[index]),
              weatherImage: getImage(data.daily.weathercode[index]),
              temperatureMax: data.daily.temperature_2m_max[index],
              temperatureMin: data.daily.temperature_2m_min[index],
              description: getImageDescription(data.daily.weathercode[index]),
            }));

            setNextDaysData(forecastNextDays);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const parseDate = (date) => {
    const time = new Date(date);
    return time.toString().slice(0, 3);
  };

  return (
    <section className="weather-card-detail">
      <div className="left">
        <h4 className="city-name">{weatherInformation?.cityName}</h4>
        <div className="current-weather glassmorphism">
          <span className="current-date">{currentInfo.time}</span>
          <p className="current-weather-description">
            {currentInfo.description}
          </p>
          <h2 className="current-temperature">
            {weatherInformation?.current_weather &&
              weatherInformation?.current_weather.temperature}
            {weatherInformation?.temperature && weatherInformation?.temperature}
            °C
          </h2>
        </div>
        <img
          className="weather-img"
          src={currentInfo.weatherImage}
          alt="icon weather"
        />
      </div>

      <div className="right">
        <div className="extra-variables glassmorphism">
          <div className="variable-detail">
            <FaWind className="variable-detail-icon" />
            <span className="variable-data-number">
              {weatherInformation?.current_weather &&
                weatherInformation?.current_weather.windspeed}
              {weatherInformation?.windspeed && weatherInformation?.windspeed}
              km/h
            </span>
            <span className="variable-data-name">Wind</span>
          </div>
          <div className="variable-detail">
            <FaTint className="variable-detail-icon" />
            <span className="variable-data-number">
              {currentInfo.relativeHumidity}%
            </span>
            <span className="variable-data-name">Humidity</span>
          </div>
          <div className="variable-detail">
            <FaThermometerThreeQuarters className="variable-detail-icon" />
            <span className="variable-data-number">
              {currentInfo.apparentTemperature}°C
            </span>
            <span className="variable-data-name">Feels like</span>
          </div>
        </div>

        <div className="forecast-for-today">
          <h4 className="forecast-today">Today</h4>
          <motion.div className="forecast-per-hour slider-container">
            <motion.div
              className="slider"
              drag="x"
              dragConstraints={{ right: 0, left: -1500 }}
            >
              {todayData.map((item, index) => (
                <motion.div
                  className="forecast-mini-card item glassmorphism"
                  key={index}
                >
                  <span className="forecast-temperature">
                    {item.temperature}°C
                  </span>

                  <img
                    src={item.weatherImage}
                    alt=""
                    className="forecast-img"
                  />

                  <span className="forecast-hour">{item.time}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="forecast-for-next-days ">
          <h4 className="forecast-next-days">Next 7 Days</h4>
          <div className="forecast-for-next-days-container glassmorphism">
            {nextDaysData.map((item, index) => (
              <div className="forecast-for-next-day-item" key={index}>
                <span className="day-of-week">{item.time}</span>
                <div className="time-container">
                  <img src={item.weatherImage} alt="" className="time-img" />
                  <span className="time-description">{item.description}</span>
                </div>
                <span className="time-date">
                  {item.temperatureMax}/{item.temperatureMin}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { WeatherCardDisplay };
