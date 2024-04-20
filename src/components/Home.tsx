import { useQueries, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { koreaPlace } from "../lib/korea";
import { getWeather } from "../api/weather";
import { useEffect, useState } from "react";
import { Card } from "./Card";

// http://api.openweathermap.org/geo/1.0/direct?q=korea&limit={limit}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q=korea&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`; < 아이콘
export interface IWeather {
  city: string;
  icon: string;
  weather: string;
  sunrise: string;
  sunset: string;
  temp: string;
  temp_max: string;
  temp_min: string;
  date: string;
}

const getTime = (t: number) => {
  const date = new Date(t * 1000);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  return hour + ":" + minute + ":" + seconds;
};

const getDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  return year + "." + month + "." + day;
};

const Home = () => {
  const [weathers, setWeathers] = useState<IWeather[]>([]);

  const combinedQueries = useQueries({
    queries: Object.values(koreaPlace).map((k) => ({
      queryKey: ["weathers", k],
      queryFn: () => getWeather(k),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });
  useEffect(() => {
    if (!combinedQueries.pending) {
      const weatherTemp = combinedQueries.data.map((weather) => {
        return {
          city: weather.name.replace(/\s+/g, ""),
          icon: weather.weather[0].icon,
          weather: weather.weather[0].main,
          sunrise: getTime(weather.sys.sunrise),
          sunset: getTime(weather.sys.sunset),
          temp: weather.main.temp.toFixed(1),
          temp_max: weather.main.temp_max.toFixed(1),
          temp_min: weather.main.temp_min.toFixed(1),
          date: getDate(),
        };
      });
      setWeathers(weatherTemp);
    }
  }, [combinedQueries]);

  return (
    <>
      <Container>
        <ContainerTop>
          {weathers.map((weather, index) => (
            <Card key={index} weather={weather} />
          ))}
        </ContainerTop>
      </Container>
    </>
  );
};
const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  width: 100%;
  overflow-x: hidden;
  background-color: #e0d9d9;
`;
const ContainerTop = styled.div`
  flex: 1;
  overflow-x: hidden;
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 10px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const ContainerMiddle = styled.div`
  flex: 1;
  overflow-x: hidden;
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const ContainerBottom = styled.div`
  flex: 1;
  overflow-x: hidden;
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Loading = styled.div`
  width: 200px;
  height: 200px;
  background-color: red;
  color: white;
`;

export default Home;
