import styled from "styled-components";
import { Card } from "../../components/Card";
import { Theme } from "../../styles/theme";
import { useGetWeathers } from "../../hooks/useGetWeathers";

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

const Home = () => {
  const weathers = useGetWeathers();
  return (
    <>
      <Container>
        <ContainerTop>
          {weathers.map((weather, index) => (
            <Card key={weather.id} weather={weather} />
          ))}
        </ContainerTop>
      </Container>
    </>
  );
};
const Container = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  width: 100%;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.background};
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
export default Home;
