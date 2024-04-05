import { useState } from 'react';
import axios from 'axios'; // Import Axios library
import CityForm from './CityForm.jsx';
import Weather from './Weather.jsx';
import './App.css';

// Define your locationApiKey and locationServer
const locationApiKey = import.meta.env.VITE_LOCATION_API_KEY;
// const locationServer = import.meta.env.VITE_LOCATION_SERVER_URL;

const apiUrl = import.meta.env.VITE_API_SERVER;
const renderUrl = 'https://api.render.com/deploy/srv-co7r6bf79t8c73eobrt0?key=W770EgJti3c'; // Replace 'YOUR_RENDER_URL' with your actual Render URL

// Initialize state object with an empty array for movies
const state = {
  movies: []
};

// Function to fetch movies from the server
async function fetchMovies(searchTerm) { // Pass searchTerm as an argument
  try {
    const response = await axios.get(`${apiUrl}/movies`, { // Send GET request to /movies endpoint
      params: {
        lat: 'your_lat_value', // Provide latitude here
        lon: 'your_lon_value', // Provide longitude here
        searchQuery: searchTerm // Pass the user-provided search term
      }
    });
    if (response.status === 200) {
      // Update the movies array in the state object with the fetched movie data
      state.movies = response.data;
      // Call a function to update the UI with the fetched movie data
      updateUI();
    } else {
      // Handle error responses from the server
      console.error('Error:', response.data.message);
    }
  } catch (error) {
    // Handle network errors
    // console.error('Network error:', error);
  }
}

// Function to update the UI with the movie data
function updateUI() {
  // Example: Loop through the movies array in the state object and display each movie on the UI
  state.movies.forEach(movie => {
    // Example: Display movie title and overview in a list
    const listItem = document.createElement('li');
    listItem.textContent = `${movie.title}: ${movie.overview}`;
    document.getElementById('movieList').appendChild(listItem);
  });
}

// Call the fetchMovies function when the page loads
document.addEventListener('DOMContentLoaded', fetchMovies);

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setCity(event.target.value);
    console.log(city);
  };

  const handleCitySearch = async (cityName) => {
    // setIsLoading(true);

    try {
      const locationResponse = await fetch(`https://us1.locationiq.com/v1/search?key=${locationApiKey}&q=${cityName}&format=json`);
      if (!locationResponse.ok) {
        throw new Error('Failed to fetch location data');
      }
      // const locationData = await locationResponse.json();
      const weatherResponse = await fetch(`${renderUrl}/weather?city=${city}`);
      console.log(weatherResponse);
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const weatherResponseJson = await weatherResponse.json();
      console.log(weatherResponseJson);
      setWeatherData(weatherResponseJson);
      console.log(weatherData);
      setError('');

      // Send request to /movies endpoint with the user-provided search term
      await fetchMovies(cityName);
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
