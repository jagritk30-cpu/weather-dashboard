import { useEffect, useState } from "react";
import { getLocation, fetchWeather } from "../services/api";
import StatCard from "../components/Statcard";
import ChartBox from "../components/ChartBox";
import { fetchAirQuality } from "../services/api";

export default function CurrentWeather() {
  const [data, setData] = useState(null);
  const [airData, setAirData] = useState(null);

  useEffect(() => {
  const load = async () => {
    try {
      const loc = await getLocation();

      const weatherRes = await fetchWeather(loc.lat, loc.lon);
      const airRes = await fetchAirQuality(loc.lat, loc.lon);

      setData(weatherRes);
      setAirData(airRes);

    } catch (err) {
      console.error(err);
    }
  };
  load();
}, []);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  const chartData = data.hourly.time.map((t, i) => ({
  time: t,
  temp: data.hourly.temperature_2m[i],
  humidity: data.hourly.relativehumidity_2m[i],
  wind: data.hourly.windspeed_10m[i],
  pm10: airData?.hourly?.pm10?.[i],
  pm25: airData?.hourly?.pm2_5?.[i],
  visibility: data.hourly.visibility[i],
  precip: data.hourly.precipitation[i],
}));

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen">

  <h1 className="text-3xl font-bold text-center mb-6">
    🌤️ Weather Dashboard
  </h1>

  {/* STATS */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <StatCard title="🌡 Current Temp" value={`${data.current_weather.temperature}°C`} />
    <StatCard title="🔥 Max Temp" value={`${data.daily.temperature_2m_max[0]}°C`} />
    <StatCard title="❄ Min Temp" value={`${data.daily.temperature_2m_min[0]}°C`} />
    <StatCard title="💨 Wind Speed" value={`${data.current_weather.windspeed} km/h`} />

    <StatCard title="💧 Humidity" value={`${data.hourly.relativehumidity_2m[0]}%`} />
    <StatCard title="🌫 PM10" value={airData?.hourly?.pm10?.[0] || "N/A"} />
    <StatCard title="🌫 PM2.5" value={airData?.hourly?.pm2_5?.[0] || "N/A"} />
    <StatCard title="🌧 Precipitation" value={data.hourly.precipitation[0]} />

    <StatCard title="🌅 Sunrise" value={data.daily.sunrise[0].split("T")[1]} />
    <StatCard title="🌇 Sunset" value={data.daily.sunset[0].split("T")[1]} />
  </div>

  {/* CHARTS */}
  <ChartBox title="🌡 Temperature" data={chartData} dataKey="temp" />
  <ChartBox title="💧 Humidity" data={chartData} dataKey="humidity" />
  <ChartBox title="💨 Wind Speed" data={chartData} dataKey="wind" />
  <ChartBox title="🌫 PM10" data={chartData} dataKey="pm10" />
  <ChartBox title="🌧 Precipitation" data={chartData} dataKey="precip" />
  <ChartBox title="👁 Visibility" data={chartData} dataKey="visibility" />
  <ChartBox title="🌫 PM2.5" data={chartData} dataKey="pm25" />

</div>
  );
}