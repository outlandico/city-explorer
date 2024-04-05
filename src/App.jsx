import { useState } from 'react';
import CityForm from './CityForm.jsx';
import Weather from './Weather.jsx';
import './App.css';


// Define your locationApiKey and locationServer
const locationApiKey = import.meta.env.VITE_LOCATION_API_KEY;
// const locationServer = import.meta.env.VITE_LOCATION_SERVER_URL;

const apiUrl = import.meta.env.VITE_API_SERVER;

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setCity(event.target.value);
    console.log(city);
  };

  const handleCitySearch = async () => {
    // setIsLoading(true);

    try {
      const locationResponse = await fetch(`https://us1.locationiq.com/v1/search?key=${locationApiKey}&q=${city}&format=json`);
      if (!locationResponse.ok) {
        throw new Error('Failed to fetch location data');
      }
      const locationData = await locationResponse.json();
      const weatherResponse = await fetch(`${apiUrl}/weather?city=${city}`);
      console.log(weatherResponse);
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const weatherResponseJson = await weatherResponse.json();
      console.log(weatherResponseJson);
      setWeatherData(weatherResponseJson);
      console.log(weatherData);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to fetch weather data. Please try again.');
    } 
    // finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="container">
      <CityForm city={city} onCitySearch={handleCitySearch} handleChange={handleChange} />
      {weatherData.length > 0 && weatherData.map((data, index) => (
        <Weather key={index} forecast={data} />
      ))}
      {error && <p className="error-message">{error}</p>}
      {/* {isLoading && <p>Loading...</p>} */}
    </div>
  );
}

export default App;
