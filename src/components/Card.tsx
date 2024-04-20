import styled from "styled-components";
import { IWeather } from "./Home";
interface CardProps {
  weather: IWeather;
}

export const Card = ({ weather }: CardProps) => {
  console.log(weather);
  return (
    <Container style={{ backgroundImage: `url(/korea/${weather.city}.jpg)` }}>
      <ContentContainer>
        <ContentLeft>
          <ImageContainer>
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt=""
            />
          </ImageContainer>
          <DesContainer>
            <WeatherText>
              <h1>{weather.weather}</h1>
            </WeatherText>
            <CityText>
              <h1>{weather.city + "-" + weather.date}</h1>
            </CityText>
          </DesContainer>
        </ContentLeft>
        <ContentRight>
          <TempContainer>
            <TempText>{weather.temp}°C</TempText>
          </TempContainer>
          <DesContainer>
            <TempDetailText>
              <h1>최저 : {weather.temp_min}°C</h1>
              <h1>최고 : {weather.temp_max}°C</h1>
            </TempDetailText>
            <SunText>
              <h1>일출 : {weather.sunrise}</h1>
              <h1>일몰 : {weather.sunset}</h1>
            </SunText>
          </DesContainer>
        </ContentRight>
      </ContentContainer>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  /* border-radius: 25px; */
  box-shadow: rgb(0 0 0 / 69%) 0px 6px 22px -10px,
    rgb(0 0 0 / 100%) 0px 10px 10px -10px;
  background-size: cover;
`;

const Title = styled.div`
  display: flex;
  padding-left: 15px;
  align-items: center;
  font-weight: 700;
  font-size: 22px;
  height: 15%;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const ContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const ImageContainer = styled.div`
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

const DesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 100%;
`;
const TempContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 100%;
`;

const WeatherText = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  &:before {
    content: "";
    opacity: 0.5;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: #8b3c3c;
    position: absolute;
  }
  h1 {
    color: #ffffff;
    text-align: center;
    font-weight: 600;
    position: relative;
    font-size: 32px;
  }
`;
const CityText = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  &:before {
    content: "";
    opacity: 0.5;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: #4277af;
    position: absolute;
  }
  h1 {
    color: #ffffff;
    text-align: center;
    font-weight: 600;
    position: relative;
    font-size: 28px;
  }
`;
const ContentRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
`;
const TempText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 72px;
  letter-spacing: 3px;
  font-weight: 700;
`;

const TempDetailText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 50%;
  width: 100%;
  font-weight: 700;
  font-size: 18px;
`;
const SunText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 50%;
  width: 100%;
  font-weight: 700;
  font-size: 18px;
`;
