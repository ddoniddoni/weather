import { ForecastWeather } from "../interfaces/weatherType";
import styled from "styled-components";

export const ForecastCard = (list: Pick<ForecastWeather, "list">) => {
  return (
    <Card>
      <CardText>{}</CardText>
      <Border></Border>
      <CardInfo></CardInfo>
    </Card>
  );
};

const Card = styled.div`
  width: 130px;
  height: 90%;
  background-color: #1b1b1d;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const CardText = styled.div`
  display: flex;
  height: 20%;
  width: 100%;
`;
const Border = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1px;
  width: 65%;
  background-color: #686666;
`;
const CardInfo = styled.div`
  height: 80%;
`;
