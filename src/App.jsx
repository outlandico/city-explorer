
import  { useState } from 'react';
import axios from 'axios'; // Import Axios library
import CityForm from './CityForm.jsx';
import Weather from './Weather.jsx';
import './App.css';

const locationApiKey = import.meta.env.VITE_LOCATION_API_KEY;
const apiUrl = import.meta.env.VITE_API_SERVER;

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleCitySearch = async (city) => {
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

      // Capture search query from user input (replace with your actual implementation)
      const searchQuery = 'Action'; // Example: Replace this with your actual implementation

      // Fetch movies with the provided search query
      const moviesResponse = await fetchMovies(searchQuery);
      setMovies(moviesResponse); // Set movies state with fetched data

    } catch (error) {
      console.error(error);
      setError('Failed to fetch weather data. Please try again.');
    } 
  };

  // Function to fetch movies from the server
  async function fetchMovies(searchQuery) {
    try {
      const response = await axios.get(`${apiUrl}/movies`, {
        params: {
          searchQuery: searchQuery
        }
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error:', response.data.message);
        return [];
      }
    } catch (error) {
      console.error('Network error:', error);
      return [];
    }
  }

  return (
    <div className="container">
      <CityForm city={city} onCitySearch={handleCitySearch} handleChange={handleChange} />
      <ul id="movieList" className="movie-list">
        {movies.map((movie, index) => (
          <li key={index} className="movie-item">
            <span className="movie-title">{movie.title}</span>: <span className="movie-overview">{movie.overview}</span>
          </li>
        ))}
      </ul>
      {weatherData.length > 0 && weatherData.map((data, index) => (
        <Weather key={index} forecast={data} />
      ))}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
