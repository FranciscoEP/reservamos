import { SkyconsType } from 'react-skycons';

export const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;
export const OPEN_WEATHER_TOKEN = process.env.NEXT_PUBLIC_OPEN_WEATHER_TOKEN;
export const OPEN_WEATHER_API = process.env.NEXT_PUBLIC_OPEN_WEATHER_API;
export const parts = ['minutely', 'hourly'];
export const getIcon = (code) => {
  if (code >= 200 && code < 300) {
    return SkyconsType.RAIN;
  }
  if (code >= 300 && code < 500) {
    return SkyconsType.SLEET;
  }
  if (code >= 500 && code < 600) {
    return SkyconsType.RAIN;
  }
  if (code >= 600 && code < 700) {
    return SkyconsType.SNOW;
  }
  if (code >= 700 && code < 800) {
    return SkyconsType.FOG;
  }
  if (code === 800) {
    return SkyconsType.CLEAR_DAY;
  }
  if (code >= 801 && code < 803) {
    return SkyconsType.PARTLY_CLOUDY_DAY;
  }
  if (code >= 802 && code < 900) {
    return SkyconsType.CLOUDY;
  }
  if (code === 905 || (code >= 951 && code <= 956)) {
    return SkyconsType.WIND;
  }
  if (code >= 900 && code < 1000) {
    return SkyconsType.RAIN;
  }
};
