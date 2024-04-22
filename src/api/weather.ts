interface IWeather {
  lat: number;
  lng: number;
}
export const getWeather = ({ lat, lng }: IWeather) => {
  const data = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=kr&units=metric`
  ).then((res) => res.json());
  return data;
};

export const getForecastWeather = ({ lat, lng }: any) => {
  const data = fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=kr&units=metric`
  ).then((res) => res.json());
  return data;
};
