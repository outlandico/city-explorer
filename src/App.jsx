import { useState } from 'react';
import axios from 'axios';
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleCitySearch = async (city) => {
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

      // Fetch movies
      const moviesResponse = await fetchMovies(city);
      setMovies(moviesResponse);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
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
      {weatherData.length > 0 && weatherData.map((data, index) => (
        <Weather key={index} forecast={data} />
      ))}

      <div className="movies-container">
        {isLoading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {!isLoading && movies.length > 0 && (
          <div className="row">
            {movies.map((movie, index) => (
              <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                <div className="item">
                  <div className="card mb-4">
                    <img className="card-img-top" src={movie.imageUrl} alt={movie.title} />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">{movie.overview}</p>
                      <p className="card-text">Average Votes: {movie.averageVotes}</p>
                      <p className="card-text">Total Votes: {movie.totalVotes}</p>
                      <p className="card-text">Popularity: {movie.popularity}</p>
                      <p className="card-text">Released On: {movie.releasedOn}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
