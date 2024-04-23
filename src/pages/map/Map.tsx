import styled from "styled-components";
import { GooMap } from "../../components/GooMap";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { Theme } from "../../styles/theme";
import { useQuery } from "@tanstack/react-query";
import { getForecastWeather, getWeather } from "../../api/weather";
import { useEffect, useState } from "react";
import { WeatherInfo } from "../../components/WeatherInfo";
import { ForecastWeather, Weather } from "../../interfaces/weatherType";
import { getDate, getTime } from "../Home/Home";

export const Map = () => {
  const location = useGeoLocation();
  const [forecast, setForecast] = useState<ForecastWeather>({
    city: {
      name: "",
    },
    cnt: 0,
    cod: "",
    list: [],
    message: 0,
  });
  const [weather, setWeather] = useState<Weather>({
    city: "",
    icon: "",
    weather: "",
    sunrise: "",
    sunset: "",
    temp: "",
    temp_max: "",
    temp_min: "",
    date: "",
    id: "",
  });

  const forecastWeatherQuery = useQuery({
    queryKey: ["forecastWeather", location.coordinates],
    queryFn: () => getForecastWeather(location.coordinates),
    enabled: !!location.coordinates,
  });

  const weatherQuery = useQuery({
    queryKey: ["weather", location.coordinates],
    queryFn: () => getWeather(location.coordinates),
    enabled: !!location.coordinates,
  });

  useEffect(() => {
    if (!forecastWeatherQuery.isLoading) {
      setForecast(forecastWeatherQuery.data);
    }
  }, [forecastWeatherQuery.isLoading, forecastWeatherQuery.data]);

  useEffect(() => {
    if (!weatherQuery.isLoading) {
      const tempData = {
        city: weatherQuery.data.name.replace(/\s+/g, ""),
        icon: weatherQuery.data.weather[0].icon,
        weather: weatherQuery.data.weather[0].main,
        sunrise: getTime(weatherQuery.data.sys.sunrise),
        sunset: getTime(weatherQuery.data.sys.sunset),
        temp: weatherQuery.data.main.temp.toFixed(1),
        temp_max: weatherQuery.data.main.temp_max.toFixed(1),
        temp_min: weatherQuery.data.main.temp_min.toFixed(1),
        date: getDate(),
        id: weatherQuery.data.id,
      };
      setWeather(tempData);
    }
  }, [weatherQuery.isLoading, weatherQuery.data]);
  return (
    <Container>
      <LeftContainer>
        <MapContainer>
          <GooMap coordinates={location.coordinates} />
        </MapContainer>
        <InfoContainer>
          <WeatherInfo forecast={forecast} weather={weather} />
        </InfoContainer>
      </LeftContainer>
      <RightContainer></RightContainer>
    </Container>
  );
};

const Container = styled.div<{ theme: Theme }>`
  display: flex;
  width: 100%;
  height: calc(100vh - 70px);
  flex-direction: row;
  background-color: ${(props) => props.theme.background};
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;
