# Weather Web

## 기능

1. 사용자의 현재 위치정보를 받아서 날씨 정보 제공 (openweathermap API)
2. 지도내에서 클릭한 부분 날씨 정보 제공 (google map API)
3. 다른 도시들의 날씨 정보 제공
4. Light, Dark 모드 구현

## Skils

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![styled-components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![zustand](https://img.shields.io/badge/zustand-291c13?style=for-the-badge&&logoColor=white)
![react-query](https://img.shields.io/badge/react--query-F73F51?style=for-the-badge&&logoColor=white)

## Link

[Today's Weather](https://weather-3b142.web.app/)

## 파일 구조

📦src
┣ 📂api
┃ ┗ 📜weather.ts
┣ 📂assets
┣ 📂components
┃ ┣ 📜Card.tsx
┃ ┣ 📜CityCard.tsx
┃ ┣ 📜ForecastCard.tsx
┃ ┣ 📜GooMap.tsx
┃ ┣ 📜Header.tsx
┃ ┣ 📜Layout.tsx
┃ ┗ 📜WeatherInfo.tsx
┣ 📂data
┃ ┣ 📜cities.ts
┃ ┗ 📜weatherCodeTran.ts
┣ 📂hooks
┃ ┣ 📜useGeoLocation.ts
┃ ┗ 📜useGetWeathers.ts
┣ 📂interfaces
┃ ┗ 📜weatherType.ts
┣ 📂pages
┃ ┣ 📂Home
┃ ┃ ┗ 📜Home.tsx
┣ 📂store
┃ ┗ 📜themeStore.ts
┣ 📂styles
┃ ┣ 📜GlobalStyle.tsx
┃ ┗ 📜theme.ts
┣ 📜App.tsx
┗ 📜index.tsx

## 프로젝트 설명

사용자가 위치 허용을 해주면 위치에 맞는 현재 날씨정보와 3시간마다 갱신되는 날씨정보를 제공합니다.
<br>Google Map을 통해서 원하는 위치를 클릭하면, 그 위치에 맞는 날씨를 제공합니다.
<br>다른 나라의 수도 날씨도 제공합니다.
