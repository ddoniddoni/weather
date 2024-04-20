interface IWeather {
  lat: number;
  lon: number;
}
export const getWeather = ({ lat, lon }: IWeather) => {
  const data = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=kr&units=metric`
  ).then((res) => res.json());
  return data;
};
