
import { useState } from 'react';
import PropTypes from 'prop-types';

function CityForm({ onCitySearch, city, handleChange }) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null); // State to manage error message

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('City submitted:', city);
      setMapLoaded(false); // Hide map until new city data is loaded
      await onCitySearch(city);
      // Reset error state if no error occurs
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch weather data'); // Set error message
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cityInput">
          Enter a city name:
          <input
            id="cityInput"
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Enter city name"
          />
        </label>
        <button type="submit">Explore!</button>
      </form>
      {mapLoaded && (
        <div style={{ width: '100%', height: '400px' }}>
          <iframe
            title="City Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://maps.google.com/maps?q=${city}&output=embed`}
          />
        </div>
      )}
      {error && <p className="error-message">{error}</p>} {/* Render error message if error state is set */}
    </div>
  );
}

// Prop types validation
CityForm.propTypes = {
  onCitySearch: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CityForm;
