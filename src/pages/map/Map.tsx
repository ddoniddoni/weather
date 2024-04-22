import styled from "styled-components";
import { GooMap } from "../../components/GooMap";
import { ILocationType, useGeoLocation } from "../../hooks/useGeoLocation";
import { Theme } from "../../styles/theme";
import { useQuery } from "@tanstack/react-query";
import { getForecastWeather, getWeather } from "../../api/weather";
import { useEffect, useState } from "react";
import { WeatherInfo } from "../../components/WeatherInfo";

export interface IForecastWeatherType {
  city: {};
  cnt: number;
  cod: string;
  list: [];
  message: number;
}

export const Map = () => {
  const location: ILocationType = useGeoLocation();
  const [forecast, setForecast] = useState<IForecastWeatherType>({
    city: {},
    cnt: 0,
    cod: "",
    list: [],
    message: 0,
  });
  const { isLoading, error, data } = useQuery({
    queryKey: ["forecastWeather", location.coordinates],
    queryFn: () => getForecastWeather(location.coordinates),
  });
  useEffect(() => {
    if (!isLoading) {
      setForecast(data);
    }
  }, [data]);
  return (
    <Container>
      <MapContainer>
        <GooMap coordinates={location.coordinates} />
      </MapContainer>
      <InfoContainer>
        <WeatherInfo forecast={forecast} />
      </InfoContainer>
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
const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
`;
const InfoContainer = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
`;
