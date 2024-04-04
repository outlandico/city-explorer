import { useState } from 'react';
import CityForm from './CityForm.jsx';
import Weather from './Weather.jsx';
import './App.css';



// Define your locationApiKey and locationServer
const locationApiKey = import.meta.env.VITE_LOCATION_API_KEY;
const locationServer = 'YOUR_LOCATION_SERVER_URL'; // Replace 'YOUR_LOCATION_SERVER_URL' with your actual server URL
const url = `${locationServer}/locationcity`;

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleCitySearch = async () => {
    setIsLoading(true);

    try {
      const locationResponse = await fetch(`https://us1.locationiq.com/v1/search?key=${locationApiKey}&q=${city}&format=json`);
      if (!locationResponse.ok) {
        throw new Error('Failed to fetch location data');
      }
      const locationData = await locationResponse.json();
      const { lat, lon } = locationData[0];
      
      const weatherResponse = await fetch(`${url}?searchQuery=${city}&lat=${lat}&lon=${lon}`);
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const weatherResponseJson = await weatherResponse.json();
      
      setWeatherData(weatherResponseJson);
      setError('');
    } catch (error) {
      setError('Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <CityForm city={city} onCitySearch={handleCitySearch} handleChange={handleChange} />
      {weatherData.map((data, index) => (
        <Weather key={index} forecast={data} />
      ))}
      {error && <p className="error-message">{error}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default App;
