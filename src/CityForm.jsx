// CityForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types'; // Import prop types

const CityForm = ({ onCitySearch }) => {
  const [city, setCity] = useState('');

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCitySearch(city);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={city} onChange={handleChange} placeholder="Enter city name" />
      <button type="submit">Search</button>
    </form>
  );
};

// Define prop types
CityForm.propTypes = {
  onCitySearch: PropTypes.func.isRequired // Validate onCitySearch prop as a required function
};

export default CityForm;
