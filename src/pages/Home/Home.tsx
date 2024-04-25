import styled from "styled-components";
import { Theme } from "../../styles/theme";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useEffect, useState } from "react";
import {
  Coordinate,
  ForecastWeather,
  Weather,
} from "../../interfaces/weatherType";
import { getForecastWeather, getWeather } from "../../api/weather";
import { useQueries, useQuery } from "@tanstack/react-query";
import { otherCities } from "../../data/cities";
import { GooMap } from "../../components/GooMap";
import { WeatherInfo } from "../../components/WeatherInfo";
import { CityCard } from "../../components/CityCard";

// http://api.openweathermap.org/geo/1.0/direct?q=korea&limit={limit}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q=korea&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`; < 아이콘

export const getTime = (t: number | Date) => {
  const date = typeof t === "number" ? new Date(t * 1000) : new Date();
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  // const seconds = ("0" + date.getSeconds()).slice(-2);
  return hour + ":" + minute;
};

export const getDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  return year + "." + month + "." + day;
};

export const Home = () => {
  const { coordinates, updateLocation } = useGeoLocation();
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
  const [otherCitiesWeather, setOtherCitiesWeather] = useState<Weather[]>([]);

  const forecastWeatherQuery = useQuery({
    queryKey: ["forecastWeather", coordinates],
    queryFn: () => getForecastWeather(coordinates),
    enabled: !!coordinates,
  });

  const weatherQuery = useQuery({
    queryKey: ["weather", coordinates],
    queryFn: () => getWeather(coordinates),
    enabled: !!coordinates,
  });

  const otherCitiesQuery = useQueries({
    queries: Object.values(otherCities).map((city) => ({
      queryKey: ["otherCities", city],
      queryFn: () => getWeather(city),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
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

  useEffect(() => {
    if (!otherCitiesQuery.pending) {
      const weatherTemp = otherCitiesQuery.data.map((city) => {
        return {
          city: city.name.replace(/\s+/g, ""),
          icon: city.weather[0].icon,
          weather: city.weather[0].main,
          sunrise: getTime(city.sys.sunrise),
          sunset: getTime(city.sys.sunset),
          temp: city.main.temp.toFixed(1),
          temp_max: city.main.temp_max.toFixed(1),
          temp_min: city.main.temp_min.toFixed(1),
          date: getDate(),
          id: city.id,
        };
      });
      setOtherCitiesWeather(weatherTemp);
    }
  }, [otherCitiesQuery.pending, otherCitiesQuery.data]);

  const getLocation = (data: Coordinate) => {
    if (window.confirm("현재 위치 날씨를 조회하시겠습니까?")) {
      updateLocation(data);
    }
  };

  return (
    <Container>
      <LeftContainer>
        <MapContainer>
          <GooMap coordinates={coordinates} getLocation={getLocation} />
        </MapContainer>
        <InfoContainer>
          <WeatherInfo forecast={forecast} weather={weather} />
        </InfoContainer>
      </LeftContainer>
      <RightContainer>
        <TextContainer>
          <h1>🌎 Other Large Cities</h1>
        </TextContainer>
        <CardContainer>
          {otherCitiesWeather.map((weather) => (
            <CityCard key={weather.id} weather={weather} />
          ))}
        </CardContainer>
      </RightContainer>
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
  align-items: center;
  width: 30%;
  height: 100%;
`;

const TextContainer = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  color: ${(props) => props.theme.color};
  h1 {
    font-size: 30px;
    font-weight: 600;
  }
`;
const CardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 90%;
  width: 100%;
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
