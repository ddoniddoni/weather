import styled from "styled-components";
import { ForecastWeather, Weather } from "../interfaces/weatherType";
import { ForecastCard } from "./ForecastCard";
import { getTime } from "../pages/Home/Home";

interface WeatherInfo {
  forecast: ForecastWeather;
  weather: Weather;
}

export const WeatherInfo = ({ forecast, weather }: WeatherInfo) => {
  const todayTime = getTime(new Date());

  return (
    <Container>
      <LeftInfo>
        <WeatherCard>
          <CardTitle>
            <h1>{weather.city}</h1>
            <h1>{todayTime}</h1>
          </CardTitle>
          <CardInfo>
            <CardInfoLeft>
              <TempText>{weather.temp}°C</TempText>
              <TempDetailText>
                <Detail>
                  <h1>Max :&nbsp;</h1>
                  <p>{weather.temp_max}°C</p>
                </Detail>
                <Detail>
                  <h1>Min :&nbsp;</h1>
                  <p>{weather.temp_min}°C</p>
                </Detail>
              </TempDetailText>
            </CardInfoLeft>
            <CardInfoRight>
              <TempIcon>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt=""
                />
              </TempIcon>
              <TempDetailText>
                <Detail>
                  <h1>Sunrise :&nbsp;</h1>
                  <p>{weather.sunrise}</p>
                </Detail>
                <Detail>
                  <h1>Sunset :&nbsp;</h1>
                  <p>{weather.sunset}</p>
                </Detail>
              </TempDetailText>
            </CardInfoRight>
          </CardInfo>
        </WeatherCard>
      </LeftInfo>
      <RightInfo>
        {forecast.list.slice(0, 5).map((l, index) => (
          <ForecastCard key={index} list={l} />
        ))}
      </RightInfo>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  height: 90%;
`;
const LeftInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  width: 35%;
  height: 100%;
`;

const WeatherCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  width: 90%;
  height: 90%;
  background-color: #bbd7ec;
`;
const CardTitle = styled.div`
  background-color: #aecadf;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
  font-weight: 700;
  font-size: 20px;
`;
const CardInfo = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: row;
`;
const CardInfoLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
`;

const TempText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  font-size: 46px;
  font-weight: 700;
`;

const TempDetailText = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  justify-content: space-evenly;
  padding-left: 20px;
`;
const Detail = styled.span`
  display: flex;
  flex-direction: row;
  h1 {
    color: #7a7a7a;
  }
  p {
    color: #000000;
  }
`;

const CardInfoRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
`;

const RightInfo = styled.div`
  display: flex;
  width: 65%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

const TempIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  img {
    width: 150px;
    height: 150px;
  }
`;
