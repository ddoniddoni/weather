import { useEffect, useState } from "react";
import { Weather } from "../interfaces/weatherType";
import { useQueries } from "@tanstack/react-query";
import { koreaPlace } from "../data/korea";
import { getWeather } from "../api/weather";
import { getDate, getTime } from "../pages/Home/Home";

export const useGetWeathers = () => {
  const [weathers, setWeathers] = useState<Weather[]>([]);

  const combinedQueries = useQueries({
    queries: Object.values(koreaPlace).map((k) => ({
      queryKey: ["weathers", k],
      queryFn: () => getWeather(k),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });
  useEffect(() => {
    if (!combinedQueries.pending) {
      const weatherTemp = combinedQueries.data.map((weather) => {
        return {
          city: weather.name.replace(/\s+/g, ""),
          icon: weather.weather[0].icon,
          weather: weather.weather[0].main,
          sunrise: getTime(weather.sys.sunrise),
          sunset: getTime(weather.sys.sunset),
          temp: weather.main.temp.toFixed(1),
          temp_max: weather.main.temp_max.toFixed(1),
          temp_min: weather.main.temp_min.toFixed(1),
          date: getDate(),
          id: weather.id,
        };
      });
      setWeathers(weatherTemp);
    }
  }, [combinedQueries]);
  return weathers;
};
