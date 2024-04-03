import  { useState } from 'react';
import CityForm from './CityForm.jsx';
import Weather from './Weather.jsx'; // Import the Weather component
import './App.css'; // Import the CSS file

function App() {
  // State variables for weather data, error handling, and loading state
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  // Function to handle city search submission
  const handleCitySearch = async (city) => {
    try {
      setIsLoading(true); // Set loading state to true during fetch

      // Make a request to the location API to get lat and lon
      const locationResponse = await fetch(`https://us1.locationiq.com/v1/search?key=${import.meta.env.REACT_APP_LOCATION_API_KEY}&q=${city}&format=json`);
      if (!locationResponse.ok) {
        throw new Error('Failed to fetch location data');
      }
      const locationData = await locationResponse.json();
      const { lat, lon } = locationData[0]; // Assuming lat and lon are in the first object of the array
      
      // Make a request to your server's /weather endpoint
      const weatherResponse = await fetch(`/weather?lat=${lat}&lon=${lon}`);
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const weatherData = await weatherResponse.json();
      
      // Update weatherData state with the fetched data
      setWeatherData(weatherData);
      setError(''); // Reset any previous error message
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch weather data');
    } finally {
      setIsLoading(false); // Set loading state to false after fetch
    }
  };

  return (
    <div className="container">
      {/* Render the CityForm component and pass handleCitySearch as a prop */}
      <CityForm onCitySearch={handleCitySearch} />
      
      {/* Render the Weather component if weatherData is not null */}
      {weatherData && <Weather forecast={weatherData} />}
      
      {/* Render error message if there's an error */}
      {error && <p className="error-message">{error}</p>}
      
      {/* Render loading message if isLoading is true */}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default App;
