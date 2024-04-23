export interface ForecastType {
  forecast: ForecastWeather;
}

export interface ForecastWeather {
  city: {
    name: string;
  };
  cnt: number;
  cod: string;
  list: [];
  message: number;
}

export interface WeatherType {
  weather: Weather;
}

export interface Weather {
  city: string;
  icon: string;
  weather: string;
  sunrise: string;
  sunset: string;
  temp: string;
  temp_max: string;
  temp_min: string;
  date: string;
  id: string;
}

export interface Location {
  coordinates?: Coordinate;
}

export interface Coordinate {
  lat: number;
  lng: number;
}
