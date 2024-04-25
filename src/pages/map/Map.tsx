import styled from "styled-components";
import { Theme } from "../../styles/theme";
import { useGetWeathers } from "../../hooks/useGetWeathers";
import { Card } from "../../components/Card";

export const Map = () => {
  const weathers = useGetWeathers();
  return (
    <>
      <Container>
        <ContainerTop>
          {weathers.map((weather) => (
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
