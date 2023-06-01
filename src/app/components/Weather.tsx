"use client";
import { useState } from 'react';
import axios from 'axios';
import WeatherInfo from './WeatherInfo';
import moment from 'moment';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface WeatherData {
  dt: number;
  timezone: number;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
}

const getWeather = async (city: string) => {
  const options = {
    method: 'GET',
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherResult, setWeatherResult] = useState<WeatherData | null>(null);
  const [localDateTime, setLocalDateTime] = useState('');
  const [searchedCity, setSearchedCity] = useState('');

  const handleClick = async () => {
    const cityNameInput = document.getElementById('city-name') as HTMLInputElement;
    const cityValue = cityNameInput.value;
    if (!cityValue) return;

    setCity(cityValue);
    setSearchedCity(cityValue);
    const weatherResult = await getWeather(cityValue);
    setWeatherResult(weatherResult);

    if (weatherResult) {
      const formattedLocalDateTime = moment
        .unix(weatherResult.dt)
        .utcOffset(weatherResult.timezone / 60)
        .format('MMMM Do YYYY, h:mm a');
      setLocalDateTime(formattedLocalDateTime);
      console.log("Local datetime:", formattedLocalDateTime);
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/w/${iconCode}.png`;
  };

  return (
    <>
      <input
        type="text"
        id="city-name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button id="findBtn" onClick={handleClick}>Find Weather</button>
      {weatherResult && (
        <>
          <WeatherInfo
            temperature={weatherResult.main.temp}
            humidity={weatherResult.main.humidity}
            description={weatherResult.weather[0].description}
            feelsLike={weatherResult.main.feels_like}
            timezone={weatherResult.dt}
            localDateTime={localDateTime}
            city={searchedCity}
            weatherIcon={getWeatherIcon(weatherResult.weather[0].icon)}
          />
        </>
      )}
    </>
  );
};

export default Weather;
