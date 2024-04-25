import styled from "styled-components";
import { getTime } from "../pages/Home/Home";
import { Theme } from "../styles/theme";

interface ListType {
  clouds: {};
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  pop: number;
  sys: {};
  visibility: number;
  weather: [
    {
      icon: string;
      main: string;
    }
  ];
  wind: {};
}
interface List {
  list: ListType;
}

export const ForecastCard = ({ list }: List) => {
  return (
    <Card>
      <CardText>{getTime(list.dt)}</CardText>
      <Border></Border>
      <CardInfo>
        <img
          src={`http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`}
          alt=""
        />
        <div>
          <h1>{list.main.temp.toFixed(1)}°C</h1>
          <h1>{list.weather[0].main}</h1>
        </div>
      </CardInfo>
    </Card>
  );
};

const Card = styled.div<{ theme: Theme }>`
  width: 130px;
  height: 90%;
  background-color: ${(props) => props.theme.forecastCardColor};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${(props) => props.theme.color};
`;
const CardText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  width: 100%;
  font-size: 20px;
`;
const Border = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1px;
  width: 65%;
  background-color: #ffffff;
`;
const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 80%;
  img {
    width: 120px;
    height: 120px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 50%;
    h1 {
      font-size: 26px;
      font-weight: 700;
    }
  }
`;
