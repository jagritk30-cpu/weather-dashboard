import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getLocation, fetchHistorical } from "../services/api";
import ChartBox from "../components/ChartBox";

export default function Historical() {
  const [startDate, setStartDate] = useState(new Date("2023-01-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState(null);

  const handleFetch = async () => {
    const loc = await getLocation();

    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];
    const diff = (endDate - startDate) / (1000 * 60 * 60 * 24);

   if (diff > 730) {
  alert("Max range is 2 years");
  return;
}

    const res = await fetchHistorical(loc.lat, loc.lon, start, end);
    setData(res);
  };

  const chartData =
    data?.daily?.time.map((t, i) => ({
      time: t,
      max: data.daily.temperature_2m_max[i],
      min: data.daily.temperature_2m_min[i],
      mean: data.daily.temperature_2m_mean[i],
      precipitation: data.daily.precipitation_sum[i],
      wind: data.daily.windspeed_10m_max[i],
    })) || [];

  return (
    <div className="p-6 bg-gradient-to-br from-purple-100 to-blue-200 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        📅 Historical Weather
      </h1>

      {/* DATE PICKERS */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <DatePicker
          selected={startDate}
          onChange={setStartDate}
          className="p-2 rounded border"
        />
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          className="p-2 rounded border"
        />
        <button
          onClick={handleFetch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Fetch Data
        </button>
      </div>

      {/* CHARTS */}
      {data && (
        <>
          <ChartBox title="🔥 Max Temperature" data={chartData} dataKey="max" />
          <ChartBox title="❄ Min Temperature" data={chartData} dataKey="min" />
          <ChartBox title="🌡 Mean Temperature" data={chartData} dataKey="mean" />
          <ChartBox title="🌧 Precipitation" data={chartData} dataKey="precipitation" />
          <ChartBox title="💨 Wind Speed" data={chartData} dataKey="wind" />
        </>
      )}
    </div>
  );
}