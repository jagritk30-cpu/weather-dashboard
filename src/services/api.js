import axios from "axios";

export const getLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: 28.6139, lon: 77.2090 }); // fallback
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        () => {
          // 🔥 fallback if denied
          resolve({ lat: 28.6139, lon: 77.2090 }); // Delhi
        }
      );
    }
  });
};

export const fetchWeather = async (lat, lon) => {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}` +
    `&longitude=${lon}` +
    `&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,visibility,pm10,pm2_5` +
    `&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset` +
    `&current_weather=true` +
    `&timezone=auto`;

  const res = await axios.get(url);
  return res.data;
};

export const fetchAirQuality = async (lat, lon) => {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5`;

  const res = await axios.get(url);
  return res.data;
};

export const fetchHistorical = async (lat, lon, start, end) => {
  const url =
    `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}` +
    `&longitude=${lon}` +
    `&start_date=${start}` +
    `&end_date=${end}` +
    `&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,sunrise,sunset,precipitation_sum,windspeed_10m_max` +
    `&timezone=auto`;

  const res = await axios.get(url);
  return res.data;
};