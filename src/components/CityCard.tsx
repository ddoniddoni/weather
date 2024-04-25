import styled from "styled-components";
import { WeatherType } from "../interfaces/weatherType";
import { Theme } from "../styles/theme";

export const CityCard = ({ weather }: WeatherType) => {
  return (
    <Container>
      <LeftContainer>
        <span>{weather.city}</span>
        <p>{weather.weather}</p>
      </LeftContainer>
      <RightContainer>
        <ImageContainer>
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt=""
          />
        </ImageContainer>
        <span>{weather.temp}°C</span>
      </RightContainer>
    </Container>
  );
};

const Container = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  height: 100px;
  background-color: ${(props) => props.theme.forecastCardColor};
  color: ${(props) => props.theme.color};
  border-radius: 30px;
  margin-top: 24px;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  align-items: center;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70%;
    font-size: 24px;
  }
  p {
    height: 30%;
    font-size: 20px;
  }
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  justify-content: center;
  height: 100%;
  span {
    font-size: 24px;
    height: 30%;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
  img {
    width: 80px;
    height: 80px;
  }
`;
