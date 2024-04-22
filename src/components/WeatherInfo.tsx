import { IForecastWeatherType } from "../pages/map/Map";

interface IForecastProps {
  forecast: IForecastWeatherType;
}

export const WeatherInfo = ({ forecast }: IForecastProps) => {
  console.log(forecast);
  return <div>{forecast.cnt}</div>;
};
