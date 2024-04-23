import { useEffect, useState } from "react";

export interface ILocationType {
  loaded: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  error: {
    code: number;
    message: string;
  };
}

export const useGeoLocation = () => {
  const [location, setLocation] = useState<ILocationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
    error: {
      code: 0,
      message: "",
    },
  });
  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
      error: {
        code: 0,
        message: "",
      },
    });
  };
  const onError = (error: { code: number; message: string }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: 0,
        lng: 0,
      },
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};
