import React from 'react';

type WeatherInfoProps = {
  temperature: number;
  humidity: number;
  description: string;
  feelsLike: number;
  timezone: number;
  localDateTime: string;
  city: string;
  weatherIcon: string;
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  temperature,
  humidity,
  description,
  feelsLike,
  localDateTime,
  city,
  weatherIcon,
}) => {
  return (
    <div className='bg-white shadow rounded-lg p-5 w-[555px] h-[330px] mx-auto border-2 border-gray-300'>
      <div className='font-bold text-gray-800 text-lg'>
        <p>{localDateTime}</p>
      </div>
      <div className='flex mt-4 mb-2'>
        <div className='flex-1'>
          <p className='text-gray-600 text-sm'>{city}</p>
          <div className='flex items-center'>
            <p className='text-3xl font-bold text-gray-800'>{temperature}</p>
            <img src={weatherIcon} alt='Weather Icon' className='w-12 h-15 ml-2' />
          </div>
          <p className='text-xs text-gray-600'>{description}</p>
        </div>
        <div className='w-24'>
          <p className='text-xs text-gray-600 p-1'>humidity: {humidity}%</p>
          <p className='text-xs text-gray-600 p-1'>Feels Like:</p>
          <p className='text-xs text-gray-600 p-1'>{feelsLike}</p>
        </div>
      </div>
      <div className='flex space-x-2 justify-between border-t dark:border-gray-500'></div>
    </div>
  );
};

export default WeatherInfo;
