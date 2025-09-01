'use client';
import { useApiData } from '@/hooks/useApiData';
import { useState } from 'react';

interface WeatherData {
  current: {
    temperature_2m: number;
    weather_code: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
  };
}
const WEATHER_CODES: Record<number, string> = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
  55: 'Dense drizzle', 56: 'Light freezing drizzle', 57: 'Dense freezing drizzle',
  61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
  66: 'Light freezing rain', 67: 'Heavy freezing rain',
  71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
  77: 'Snow grains'
};

const CITIES = {
  delhi: { name: 'Delhi', coords: [28.6139, 65.2090] },
  noida: { name: 'Noida', coords: [14.5355, 66.3910] },
  bangalore: { name: 'Bangalore', coords: [30.9716, 77.5946] }
} as const;

export const WeatherWidget = () => {
  const [selectedCity, setSelectedCity] = useState<keyof typeof CITIES>('delhi');
  const { coords } = CITIES[selectedCity];

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m`;
  const { data, loading, error } = useApiData<WeatherData>(url);

  if (loading) return <div className="p-4">Loading weather...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 text-[#171717]">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Weather</h3>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value as keyof typeof CITIES)}
          className="px-2 py-1 border rounded text-sm text-[#171717]"
        >
          {Object.entries(CITIES).map(([key, { name }]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </select>
      </div>

      {/* Weather Info */}
      {data && (
        <>
          <div className="flex items-center mb-3">
            <div className="text-3xl font-bold mr-4">{data.current.temperature_2m}°C</div>
            <div>{WEATHER_CODES[data.current.weather_code] || 'Unknown'}</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Humidity: <span className="font-medium">{data.current.relative_humidity_2m}%</span></div>
            <div>Wind: <span className="font-medium">{data.current.wind_speed_10m} km/h</span></div>
          </div>
        </>
      )}
    </div>
  );
};
