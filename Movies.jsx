import  { useState } from 'react';

import CityForm from './CityForm.jsx';
import Weather from './Weather.jsx';
import Movies from './Movies.jsx'; // Import Movies component
import './App.css';

// Define your locationApiKey and locationServer
const locationApiKey = import.meta.env.VITE_LOCATION_API_KEY;
// const locationServer = import.meta.env.VITE_LOCATION_SERVER_URL;

const apiUrl = import.meta.env.VITE_API_SERVER;

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  const handleChange = (event) => {
    setCity(event.target.value);
    console.log(city);
  };

  const handleCitySearch = async (city) => {
    console.log('City:', city);

    setIsLoading(true);

    try {
      const locationResponse = await fetch(`https://us1.locationiq.com/v1/search?key=${locationApiKey}&q=${city}&format=json`);
      if (!locationResponse.ok) {
        throw new Error('Failed to fetch location data');
      }
      const weatherResponse = await fetch(`${apiUrl}/weather?city=${city}`);
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const weatherResponseJson = await weatherResponse.json();
      setWeatherData(weatherResponseJson);
      setError('');

      setIsLoading(false); // Set loading to false as weather data is loaded

    } catch (error) {
      console.error(error);
      setError('Failed to fetch weather data. Please try again.');
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  return (
    <div className="container">
      <CityForm city={city} onCitySearch={handleCitySearch} handleChange={handleChange} />
      {weatherData.length > 0 && weatherData.map((data, index) => (
        <Weather key={index} forecast={data} />
      ))}
      <Movies /> {/* Render Movies component here */}
      {/* Add your movies-container div here if you want to style it */}
    </div>
  );
}

export default App;
