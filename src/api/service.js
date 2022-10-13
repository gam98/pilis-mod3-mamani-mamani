const SERVER_DOMAIN_WEATHER = "https://api.open-meteo.com/v1/forecast?";

export const getWeather = async ({ latitude, longitude, timezone }) => {
  try {
    const response = await fetch(
      `${SERVER_DOMAIN_WEATHER}current_weather=true&latitude=${latitude}&longitude=${longitude}&timezone=${timezone}`
    );
    return response.json();
  } catch {
    throw new Error("could not fetch weather");
  }
};

export const getDetailsWeather = async ({ latitude, longitude, timezone }) => {
  try {
    const response = await fetch(
      `${SERVER_DOMAIN_WEATHER}latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=${timezone}`
    );
    return response.json();
  } catch (error) {
    throw new Error("could not fetch weather");
  }
};