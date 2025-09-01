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

const getWeatherDescription = (code: number): string => {
  const weatherCodes: { [key: number]: string } = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
    55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    80: 'Light rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
  };
  return weatherCodes[code] || 'Unknown';
};

const INDIAN_CITIES = {
  delhi: { name: 'Delhi', coords: [28.6139, 77.2090] },
  noida: { name: 'Noida', coords: [19.0760, 72.8777] },
  bangalore: { name: 'Bangalore', coords: [12.9716, 77.5946] }
};

export const WeatherWidget = () => {
  const [selectedCity, setSelectedCity] = useState<'delhi' | 'noida' | 'bangalore'>('delhi');
  
  const cityData = INDIAN_CITIES[selectedCity];
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${cityData.coords[0]}&longitude=${cityData.coords[1]}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m`;
  
  const { data, loading, error } = useApiData<WeatherData>(weatherUrl);

  const handleCityChange = (city: keyof typeof INDIAN_CITIES) => {
    setSelectedCity(city);
  };

  if (loading) return <div className="p-4">Loading weather...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Weather</h3>
        <select 
          value={selectedCity}
          onChange={(e) => handleCityChange(e.target.value as keyof typeof INDIAN_CITIES)}
          className="px-2 py-1 border rounded text-sm"
        >
          {Object.entries(INDIAN_CITIES).map(([key, city]) => (
            <option key={key} value={key}>{city.name}</option>
          ))}
        </select>
      </div>
      
      {data && (
        <div>
          <div className="flex items-center mb-3">
            <div className="text-3xl font-bold mr-4">{data.current.temperature_2m}°C</div>
            <div className="text-gray-600">{getWeatherDescription(data.current.weather_code)}</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <span className="text-gray-500">Humidity:</span>
              <span className="ml-2 font-medium">{data.current.relative_humidity_2m}%</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500">Wind:</span>
              <span className="ml-2 font-medium">{data.current.wind_speed_10m} km/h</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};