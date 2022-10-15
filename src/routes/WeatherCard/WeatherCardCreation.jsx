import "./WeatherCardCreation.css";
import { useContext, useEffect, useState } from "react";
import { getWeather } from "../../api/service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { WeatherCardsContext } from "../../context/WeatherCardsContext";

const WeatherCardCreation = () => {
  const { weatherCards, setWeatherCards } = useContext(WeatherCardsContext);
  const [dataParsed, setDataParsed] = useState({});

  let dataStored;

  const navigate = useNavigate();

  useEffect(() => {
    dataStored = localStorage.getItem("data");
    if (dataStored) {
      setDataParsed(JSON.parse(dataStored));
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cityName: "San salvador de jujuy",
      latitude: "-24.1995",
      longitude: "-65.3024",
    },
  });

  const onSubmit = (data) => {
    getWeather(data)
      .then((response) => {
        const { temperature, weathercode, windspeed, time } =
          response.current_weather;

        const newWeatherCardInfo = {
          id: crypto.randomUUID(),
          cityName: data.cityName,
          latitude: data.latitude,
          longitude: data.longitude,
          temperature,
          weathercode,
          windspeed,
          time,
        };

        setWeatherCards([...weatherCards, newWeatherCardInfo]);

        const weatherToStorage = {
          id: newWeatherCardInfo.id,
          cityName: newWeatherCardInfo.cityName,
          latitude: newWeatherCardInfo.latitude,
          longitude: newWeatherCardInfo.longitude,
        };

        localStorage.setItem(
          "data",
          JSON.stringify({
            user: dataParsed.user,
            weathers: [...dataParsed.weathers, weatherToStorage],
          })
        );

        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Create a new card</h2>

        <div className="form-group">
          <label htmlFor="cityName"></label>
          <input
            type="text"
            placeholder="Enter city"
            id="cityName"
            {...register("cityName", {
              required: "Must enter a city name",
            })}
          />
          <p className="error-msg">{errors.cityName?.message}</p>
        </div>

        <div className="form-group">
          <label htmlFor="latitude"></label>
          <input
            type="text"
            placeholder="Enter latitude"
            id="latitude"
            {...register("latitude", {
              required: "Must enter a latitude",
            })}
          />
          <p className="error-msg">{errors.latitude?.message}</p>
        </div>

        <div className="form-group">
          <label htmlFor="longitude"></label>
          <input
            type="text"
            placeholder="Enter longitude"
            id="longitude"
            {...register("longitude", {
              required: "Must enter a longitude",
            })}
          />
          <p className="error-msg">{errors.longitude?.message}</p>
        </div>

        <button type="submit" className="btn-generate-new-card">
          Create
        </button>
      </form>
    </div>
  );
};

export { WeatherCardCreation };
